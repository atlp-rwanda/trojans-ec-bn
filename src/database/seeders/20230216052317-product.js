module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Jacket",
          price: 2000,
          bonus: 2000,
          images: [
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683798080/TrojansEcommerce/tplbrfvoyqyumfkb85ir.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683798081/TrojansEcommerce/ssf9c8op4b3udh1irpfs.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683798081/TrojansEcommerce/gwpu0qrm30ku8f8rf0lk.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683798082/TrojansEcommerce/hxnajulhcabokrqpfdff.jpg",
          ],
          sellerId: 2,
          expiryDate: new Date("2035/01/01"),
          quantity: 20,
          categoryId: 1,
          available: true,
          expired: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nike Airforce",
          price: 2500,
          bonus: 0,
          images: [
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683794641/TrojansEcommerce/siwj4flswisnv79ie9m8.png",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683794641/TrojansEcommerce/d66fbuqborgosnjgfgfn.png",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683794642/TrojansEcommerce/zgk42daai79d91cayfm1.png",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683794642/TrojansEcommerce/ywnafhcu7bvem2jxourm.png",
          ],
          sellerId: 7,
          expiryDate: new Date("2027/01/01"),
          quantity: 20,
          categoryId: 1,
          available: true,
          expired: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Black Sweater",
          price: 3000,
          bonus: 0,
          images: [
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683798517/TrojansEcommerce/z8kpl0gqmu29pxxmhgmg.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683798517/TrojansEcommerce/x6fiofbruaxndxftfwqb.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683798518/TrojansEcommerce/rfnwma3gzspdafhgqn1n.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683798518/TrojansEcommerce/glkuakjplcavdjws76ar.jpg",
          ],
          sellerId: 2,
          expiryDate: new Date("2060/01/01"),
          quantity: 20,
          categoryId: 2,
          available: true,
          expired: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "gray sweatpants",
          price: 15000,
          bonus: 0,
          images: [
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491920/TrojansEcommerce/pqlvnsvkskzx4zo1trpb.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491927/TrojansEcommerce/usun3ke7wyjeoqmoi2fa.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491943/TrojansEcommerce/tcc47q8zbqhpqnt3k37e.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491948/TrojansEcommerce/d61xpner8co9uommuoy6.jpg",
          ],
          sellerId: 6,
          expiryDate: new Date("2024/01/01"),
          quantity: 20,
          categoryId: 2,
          available: true,
          expired: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mint",
          price: 1000,
          bonus: 0,
          images: [
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491920/TrojansEcommerce/pqlvnsvkskzx4zo1trpb.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491927/TrojansEcommerce/usun3ke7wyjeoqmoi2fa.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491943/TrojansEcommerce/tcc47q8zbqhpqnt3k37e.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491948/TrojansEcommerce/d61xpner8co9uommuoy6.jpg",
          ],
          sellerId: 6,
          expiryDate: new Date("2050/01/01"),
          quantity: 20,
          categoryId: 3,
          available: true,
          expired: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Potatoes",
          price: 50000,
          bonus: 0,
          images: [
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491920/TrojansEcommerce/pqlvnsvkskzx4zo1trpb.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491927/TrojansEcommerce/usun3ke7wyjeoqmoi2fa.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491943/TrojansEcommerce/tcc47q8zbqhpqnt3k37e.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1676491948/TrojansEcommerce/d61xpner8co9uommuoy6.jpg",
          ],
          sellerId: 6,
          expiryDate: new Date("2024/01/01"),
          quantity: 20,
          categoryId: 3,
          available: true,
          expired: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ADIDAS",
          price: 2000,
          bonus: 2000,
          images: [
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683798917/TrojansEcommerce/camx7dnzniqf3b7blunl.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683798918/TrojansEcommerce/y5gwlv6gzkcj4cc0a4xc.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683798918/TrojansEcommerce/pqxkqoe7sk4mxxiiakri.jpg",
            "https://res.cloudinary.com/dqk2wjyyz/image/upload/v1683798918/TrojansEcommerce/fjxotj8ho1ufnnthpxgg.jpg",
          ],
          sellerId: 2,
          expiryDate: new Date(),
          quantity: 20,
          categoryId: 1,
          available: true,
          expired: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("Products", null, {}),
};
