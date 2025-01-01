import {create} from "zustand"


const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
const getFromLocalStorage = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };


export const useProductStore = create((set, get) => ({

    modalOpen : false,
    setModalOpen: (value) => set({ modalOpen: value }),

    currentAspectRatio : (window.innerWidth/window.innerHeight),

    updateAspectRatio: () =>
        set(() => ({
          currentAspectRatio: window.innerWidth / window.innerHeight,
        })),

        

    

    selectedProduct: null, // The product currently selected
    setSelectedProduct: (product) => set({ selectedProduct: product}),
    clearSelectedProduct: () => set({ selectedProduct: null }),
      
    sortedProducts : null,
    setSortedProducts: (sps) => set({sortedProducts: sps}),


    // Cart state and methods
    cartItems: getFromLocalStorage("cartItems", []),

    addOneToCart: (prdt) =>
        set((state) => {
          const existingProduct = state.cartItems.find((item) => item._id === prdt._id);
          const updatedCartItems = existingProduct
            ? state.cartItems.map((item) => {
                if (item._id === prdt._id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
              })
            : [...state.cartItems, { ...prdt, quantity: 1 }];
          
           
            

          saveToLocalStorage("cartItems", updatedCartItems); // Save updated cart to localStorage
          return { cartItems: updatedCartItems };


          


        }),

        
    removeOneFromCart: (product) =>
        set((state) => {
            const existingProduct = state.cartItems.find((item) => item._id === product._id);
            let updatedCartItems;
        
            if (existingProduct) {
            if (existingProduct.quantity > 1) {
                // If the quantity is greater than 1, just decrease the quantity
                updatedCartItems = state.cartItems.map((item) =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                );
            } else {
                // If the quantity is 1, remove the item from the cart
                updatedCartItems = state.cartItems.filter((item) => item._id !== product._id);
            }
            } else {
            updatedCartItems = state.cartItems; // If the product is not in the cart, do nothing
            }
        
            saveToLocalStorage("cartItems", updatedCartItems); // Save updated cart to localStorage
            return { cartItems: updatedCartItems };
        }),
      
    deleteFromCart: (id) =>
        set((state) => {
            const updatedCartItems = state.cartItems.filter((item) => item._id !== id);
            saveToLocalStorage("cartItems", updatedCartItems); // Save updated cart to localStorage
            return { cartItems: updatedCartItems };
        }),
  
    updateCartItemQuantity: (id, quantity) =>
        set((state) => {
            const updatedCartItems = state.cartItems.map((item) =>
            item._id === id ? { ...item, quantity } : item
            );
            saveToLocalStorage("cartItems", updatedCartItems); // Save updated cart to localStorage
            return { cartItems: updatedCartItems };
        }),
  
    clearCart: () => {
      saveToLocalStorage("cartItems", []); // Clear cart in localStorage
      set({ cartItems: [] });
    },

    calculateTotalPrice: () =>
        get()
            .cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2),
















            

    products: [],
    setProducts: (products) => set({products}),
    
    createProduct: async (newProduct) => {
        if(!newProduct.category || !newProduct.name || !newProduct.image || !newProduct.price){
            console.log(newProduct);
            return {success: false, message: "Please fill in all fields."}
        }
        const res = await fetch("/api/products",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newProduct)
        })
        const data = res.json();
        set((state) => ({products: [...state.products, data.data]}));
        return {success: true, message: "Product created successfully"};
    },

    fetchProducts : async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({products: data.data}); 
    },
    
    deleteProduct: async (pid) => {
        const res = await fetch(`api/products/${pid}`, {
            method: 'DELETE'
        });
        const data = await res.json()
        if(!data.success) return {success: false, message: data.message};
        
        //Update the ui immediately
        set(state => ({products: state.products.filter(product => product._id !== pid)}));
        return {success:true, message: data.message};
    },

    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`api/products/${pid}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};
        
        //Update the ui immediately
        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }));
        return {success:true, message: data.message};

    },



}));