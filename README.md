# node-bkash

bKash API client for Browser & Node.js

bKash API docs: https://developer.bka.sh/v1.0.0-beta/reference

## Installation

via **npm**:

```sh
$ npm install bkash --save
```

via **yarn**:

```sh
$ yarn add bkash
```

## Usage

### Browser

```html
<script src="https://unpkg.com/bkash/dist/bkash.min.js"></script>
<script>
  const bkash = new BKash(clientOptions)
</script>
```

### Node

```js
const BKash = require('bkash')

const clientOptions = {
  mode: 'sandbox', // sandbox/pay
  type: 'checkout' // checkout/payments
}

const bkash = new BKash(clientOptions)

// https://developer.bka.sh/v1.0.0-beta/reference#querypaymentusingget
bkash.queryPayment({
  paymentID: '42'
}).then(({ data, error, headers, meta }) => {
  // data  -> HTTP Status Code < 400
  // error -> HTTP Status Code >= 400
}).catch(err => {
  // HTTP Status Code >= 500
})
```

## Authentication

```js
// required for token.grant and token.refresh methods
bkash.authenticate({
  type: 'simple',
  username: '...', // headers[`username`]
  password: '...'  // headers[`password`]
})

// required for all other methods
bkash.authenticate({
  type: 'token',
  token: '...',      // headers[`authorization`]
  appkey: '...'     // headers[`x-app-key`]
})
```

## Changelog

[Changelog for node-bkash](https://github.com/MunifTanjim/node-bkash/blob/master/CHANGELOG.md)

## License

Licensed under the MIT License. Check the [LICENSE](https://github.com/MunifTanjim/node-bkash/blob/master/LICENSE) file for details.
