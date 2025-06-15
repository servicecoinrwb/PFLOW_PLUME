# Simple Bonding Curve dApp

This is a fully functional, front-end dApp to interact with a bonding curve smart contract. It allows users to connect their wallet, view contract and user data, and execute `buy` and `redeem` transactions.

## File Structure
- `index.html`: The main HTML file for the user interface.
- `style.css`: Basic CSS for styling the dApp.
- `index.js`: The core application logic, including wallet connection, contract interaction, and UI updates using `ethers.js`.

## Prerequisites
- A modern web browser with the [MetaMask](https://metamask.io/) extension installed.
- [Node.js](https://nodejs.org/) and npm installed on your machine.

## How to Run

1.  **Configure the dApp:**
    -   Open `index.js`.
    -   Find the line `const contractAddress = "0xYourContractAddressHere";`.
    -   Replace `"0xYourContractAddressHere"` with the actual address of your deployed smart contract.

2.  **Install a Local Server:**
    Because of browser security policies (CORS), you cannot run a dApp by simply opening the `index.html` file. You need to serve it from a local web server. The `live-server` package is perfect for this.
    ```bash
    # Install live-server globally
    npm install -g live-server
    ```

3.  **Start the dApp:**
    Navigate to your project directory (`my-bond-dapp/`) in your terminal and run:
    ```bash
    live-server
    ```
    This will automatically open the dApp in your default browser.

4.  **Interact:**
    -   Make sure MetaMask is connected to the correct network (the one your contract is deployed on).
    -   Click "Connect Wallet" and approve the connection in MetaMask.
    -   The dApp will populate with data, and you can now use the "Buy" and "Redeem" functions.