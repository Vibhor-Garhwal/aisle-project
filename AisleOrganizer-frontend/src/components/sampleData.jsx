export const sampleProducts = [
    {
        productId: "A1242",
        aisleNo: "A221B",
        correctAisle: true,
        productDetails: {
            productName: "Wireless Mouse",
            brand: "Logitech",
            price: 1299,
            category: "Electronics",
        },
    },
    {
        productId: "B4521",
        aisleNo: "B310A",
        correctAisle: false,
        productDetails: {
            productName: "Bluetooth Headphones",
            brand: "Sony",
            price: 3499,
            category: "Audio",
        },
    },
    {
        productId: "C7823",
        aisleNo: "C104D",
        correctAisle: true,
        productDetails: {
            productName: "Smartphone Stand",
            brand: "AmazonBasics",
            price: 499,
            category: "Accessories",
        },
    },
    {
        productId: "D3410",
        aisleNo: "D290C",
        correctAisle: true,
        productDetails: {
            productName: "Mechanical Keyboard",
            brand: "Keychron",
            price: 6999,
            category: "Computers",
        },
    },
    {
        productId: "E1299",
        aisleNo: "E430B",
        correctAisle: false,
        productDetails: {
            productName: "USB-C Charger",
            brand: "Anker",
            price: 1999,
            category: "Electronics",
        },
    },
    {
        productId: "F9981",
        aisleNo: "F202A",
        correctAisle: true,
        productDetails: {
            productName: "Portable SSD",
            brand: "Samsung",
            price: 8999,
            category: "Storage",
        },
    },
    {
        productId: "G6678",
        aisleNo: "G501F",
        correctAisle: true,
        productDetails: {
            productName: "Smartwatch",
            brand: "Apple",
            price: 25999,
            category: "Wearables",
        },
    },
    {
        productId: "H7725",
        aisleNo: "H330D",
        correctAisle: false,
        productDetails: {
            productName: "Gaming Mouse",
            brand: "Razer",
            price: 4999,
            category: "Gaming",
        },
    },
    {
        productId: "I5562",
        aisleNo: "I440A",
        correctAisle: true,
        productDetails: {
            productName: "Noise Cancelling Earbuds",
            brand: "Bose",
            price: 12999,
            category: "Audio",
        },
    },
    {
        productId: "J3321",
        aisleNo: "J120C",
        correctAisle: false,
        productDetails: {
            productName: "4K Monitor",
            brand: "LG",
            price: 24999,
            category: "Displays",
        },
    },
];

export const sampleWrongProducts = [
    { productId: "P1001", aisleNo: "A12", correctAisle: false, productDetails: { productName: "Sony-TV-32-inch", brand: "Sony", category: "Electronics" } },
    { productId: "P1002", aisleNo: "B08", correctAisle: false, productDetails: { productName: "Samsung-Fridge-250L", brand: "Samsung", category: "Appliances" } },
    { productId: "P1003", aisleNo: "C05", correctAisle: false, productDetails: { productName: "LG-WashingMachine-7kg", brand: "LG", category: "Appliances" } },
    { productId: "P1004", aisleNo: "D15", correctAisle: false, productDetails: { productName: "Apple-iPhone-13", brand: "Apple", category: "Mobile" } },
    { productId: "P1005", aisleNo: "E22", correctAisle: false, productDetails: { productName: "Nike-SportsShoes-10", brand: "Nike", category: "Footwear" } },
    { productId: "P1006", aisleNo: "F18", correctAisle: false, productDetails: { productName: "Adidas-Jacket-Large", brand: "Adidas", category: "Clothing" } },
    { productId: "P1007", aisleNo: "G09", correctAisle: false, productDetails: { productName: "Puma-RunningShoes-9", brand: "Puma", category: "Footwear" } },
    { productId: "P1008", aisleNo: "H14", correctAisle: false, productDetails: { productName: "HP-Laptop-15inch", brand: "HP", category: "Computers" } },
    { productId: "P1009", aisleNo: "I20", correctAisle: false, productDetails: { productName: "Dell-Monitor-24inch", brand: "Dell", category: "Computers" } },
    { productId: "P1010", aisleNo: "J30", correctAisle: false, productDetails: { productName: "Lenovo-Tablet-10inch", brand: "Lenovo", category: "Tablets" } },
    { productId: "P1011", aisleNo: "K07", correctAisle: false, productDetails: { productName: "Canon-Camera-20MP", brand: "Canon", category: "Cameras" } },
    { productId: "P1012", aisleNo: "L17", correctAisle: false, productDetails: { productName: "Bose-Headphones-QC35", brand: "Bose", category: "Audio" } },
    { productId: "P1013", aisleNo: "M12", correctAisle: false, productDetails: { productName: "JBL-Speaker-Portable", brand: "JBL", category: "Audio" } },
    { productId: "P1014", aisleNo: "N05", correctAisle: false, productDetails: { productName: "Mi-PowerBank-20000mAh", brand: "Mi", category: "Accessories" } },
    { productId: "P1015", aisleNo: "O21", correctAisle: false, productDetails: { productName: "Asus-ROG-Phone", brand: "Asus", category: "Mobile" } },
    { productId: "P1016", aisleNo: "P16", correctAisle: false, productDetails: { productName: "Oppo-Smartwatch-44mm", brand: "Oppo", category: "Wearables" } },
    { productId: "P1017", aisleNo: "Q11", correctAisle: false, productDetails: { productName: "Vivo-TWS-Earbuds", brand: "Vivo", category: "Audio" } },
    { productId: "P1018", aisleNo: "R25", correctAisle: false, productDetails: { productName: "OnePlus-SmartTV-55inch", brand: "OnePlus", category: "Electronics" } },
    { productId: "P1019", aisleNo: "S08", correctAisle: false, productDetails: { productName: "Realme-5G-Phone", brand: "Realme", category: "Mobile" } },
    { productId: "P1020", aisleNo: "T13", correctAisle: false, productDetails: { productName: "Microsoft-SurfacePro-7", brand: "Microsoft", category: "Tablets" } }
];


export const sampleAisles = [
    { AisleId: "A100", Capacity: 100, CorrectProducts: 80, WrongProducts: 10 },
    { AisleId: "A101", Capacity: 120, CorrectProducts: 95, WrongProducts: 5 },
    { AisleId: "A102", Capacity: 90, CorrectProducts: 70, WrongProducts: 15 },
    { AisleId: "A103", Capacity: 110, CorrectProducts: 85, WrongProducts: 10 },
    { AisleId: "A104", Capacity: 85, CorrectProducts: 60, WrongProducts: 20 },
    { AisleId: "A105", Capacity: 130, CorrectProducts: 100, WrongProducts: 5 },
    { AisleId: "A106", Capacity: 70, CorrectProducts: 40, WrongProducts: 10 },
    { AisleId: "A107", Capacity: 115, CorrectProducts: 90, WrongProducts: 10 },
    { AisleId: "A108", Capacity: 100, CorrectProducts: 75, WrongProducts: 15 },
    { AisleId: "A109", Capacity: 110, CorrectProducts: 85, WrongProducts: 12 },
    { AisleId: "A110", Capacity: 105, CorrectProducts: 92, WrongProducts: 8 },
    { AisleId: "A111", Capacity: 65, CorrectProducts: 55, WrongProducts: 5 },
    { AisleId: "A112", Capacity: 150, CorrectProducts: 120, WrongProducts: 10 },
    { AisleId: "A113", Capacity: 170, CorrectProducts: 130, WrongProducts: 20 },
    { AisleId: "A114", Capacity: 50, CorrectProducts: 30, WrongProducts: 5 },
    { AisleId: "A115", Capacity: 140, CorrectProducts: 110, WrongProducts: 12 },
    { AisleId: "A116", Capacity: 80, CorrectProducts: 65, WrongProducts: 8 },
    { AisleId: "A117", Capacity: 160, CorrectProducts: 140, WrongProducts: 15 },
    { AisleId: "A118", Capacity: 120, CorrectProducts: 90, WrongProducts: 10 },
    { AisleId: "A119", Capacity: 115, CorrectProducts: 95, WrongProducts: 7 }
];
