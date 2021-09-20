![Logo](https://res.cloudinary.com/dnboldv5r/image/upload/v1632165867/probilia/ui/Probilia_a8sxyr.png)

An Ecommerce platform for furnitures server built using Node, Express, MongoDB, JWT and Mongoose.

## Tech Stack

**Client:** React, Redux, TailwindCSS and React Router.

**Server:** Node, Express, MongoDB, Mongoose and JWT.

## Screenshots

![App Screenshot](https://res.cloudinary.com/dnboldv5r/image/upload/v1632166013/probilia/ui/Screenshot_67_yqlrrz.png)

![App Screenshot](https://res.cloudinary.com/dnboldv5r/image/upload/v1632166012/probilia/ui/Screenshot_68_eqttki.png)

## Demo

[Probilia Live](https://probilia.netlify.app/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/wasifbaliyan/probilia-server.git
```

Go to the project directory

```bash
  cd probilia-client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## API Reference

#### Auth routes

```http
GET /auth/self
POST /auth/login
POST /auth/register
```

#### Get all items

```http
  GET /api/products
  GET /api/orders
  GET /api/cart
  GET /api/wishlist

```

#### Add item

```http
  POST /api/products
  POST /api/orders
  POST /api/cart
  POST /api/wishlist
```

#### Get item

```http
  GET /api/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

## Authors

- [@wasifbaliyan](https://www.github.com/wasifbaliyan)

## 🚀 About Me

I'm a full stack Javascript Developer. I Love to build beautiful and scalable web apps.

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://wasifbaliyan.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wasifbaliyan)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/wasifbaliyan)

## Badges

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

## Roadmap

- Search feature

- Toast notifications

- Razorpay/Stripe payment integration

## Support

For support, email hello@wasifbaliyan.com

## Feedback

If you have any feedback, please reach out to me at hello@wasifbaliyan.com
