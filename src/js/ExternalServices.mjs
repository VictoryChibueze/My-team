// export const baseURL = import.meta.env.VITE_SERVER_URL;

// export function convertToJson(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error("Bad Response");
//   }
// }

// export default class ExternalServices {
//   constructor(category) {
//     // this.category = category;
//     // this.path = `../json/${this.category}.json`;
//   }

//   async getData(category) {
//     const response = await fetch(baseURL + `products/search/${category}`);
//     const data = await convertToJson(response);
//     return data.Result;
//   }

//   // async getData() {
//   //   return fetch(this.path)
//   //     .then(convertToJson)
//   //     .then((data) => data);
//   // }

//   async findProductById(id) {
//     const response = await fetch(baseURL + `product/${id}`);
//     const data = await convertToJson(response);
//     return data.Result;
//   }
// }

export const baseURL = "http://server-nodejs.cit.byui.edu:3000/";
export async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}
