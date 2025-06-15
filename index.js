// This is the ABI for your main bonding contract
const contractABI = [{"inputs":[{"internalType":"address","name":"_pUSDAddress","type":"address"},{"internalType":"uint256","name":"_purchasePrice","type":"uint256"},{"internalType":"uint256","name":"_redeemRate","type":"uint256"},{"internalType":"uint256","name":"_earlyRedeemRate","type":"uint256"},{"internalType":"uint256","name":"_durationSeconds","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"payout","type":"uint256"}],"name":"EarlyRedeemed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"payout","type":"uint256"}],"name":"Redeemed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"earlyRedeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earlyRedeemRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enableTransfers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"fundVault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastBuyTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maturity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pUSD","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"purchasePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"redeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"redeemRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"transfersEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdcBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
const contractAddress = "0x14b3Fa2d3627ca1EC8042c9d33Bad94F72CEEe7f"; // <-- Your address is now here!

// ... the rest of your index.js file stays the same

// This is a standard ABI for an ERC20 token's 'approve' function.
const erc20Abi = [
    "function approve(address spender, uint256 amount) external returns (bool)"
];
// This will be fetched from your contract later
let pUSDAddress; 

// Global variables to hold ethers objects
let provider;
let signer;
let contract;

// --- DOM ELEMENTS ---
const connectButton = document.getElementById('connectButton');
const dappInterface = document.getElementById('dapp');
const statusElement = document.getElementById('status');
const contractNameSpan = document.getElementById('contractName');
const contractSymbolSpan = document.getElementById('contractSymbol');
const contractSymbolDisplay = document.getElementById('contractSymbolDisplay');
const maturityDateSpan = document.getElementById('maturityDate');
const totalSupplySpan = document.getElementById('totalSupply');
const userAddressSpan = document.getElementById('userAddress');
const userBalanceSpan = document.getElementById('userBalance');
const buyAmountInput = document.getElementById('buyAmount');
const buyButton = document.getElementById('buyButton');
const redeemButton = document.getElementById('redeemButton');

// --- EVENT LISTENERS ---
connectButton.addEventListener('click', connectWallet);
buyButton.addEventListener('click', handleBuy);
redeemButton.addEventListener('click', handleRedeem);

// --- FUNCTIONS ---

/**
 * Connects to the user's Ethereum wallet (e.g., MetaMask).
 */
async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        updateStatus("Please install MetaMask!");
        return;
    }

    try {
        updateStatus("Connecting...");
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Hide connect button and show dApp interface
        connectButton.classList.add('hidden');
        dappInterface.classList.remove('hidden');
        
        // Initial data fetch
        await updateUI();
        updateStatus("Connected successfully!");

    } catch (error) {
        console.error(error);
        updateStatus("Failed to connect wallet.");
    }
}

/**
 * Fetches all data and updates the UI.
 */
async function updateUI() {
    try {
        // Fetch contract and user data in parallel
        await Promise.all([updateContractInfo(), updateUserInfo()]);
    } catch (error) {
        console.error("Failed to update UI:", error);
        updateStatus("Error fetching data from the contract.");
    }
}

/**
 * Fetches and displays general contract information.
 */
async function updateContractInfo() {
    const [name, symbol, maturity, totalSupply, pUSDAddr] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.maturity(),
        contract.totalSupply(),
        contract.pUSD() // Get the pUSD address from the contract
    ]);

    pUSDAddress = pUSDAddr; // Store pUSD address globally

    contractNameSpan.textContent = name;
    contractSymbolSpan.textContent = symbol;
    contractSymbolDisplay.textContent = symbol;
    maturityDateSpan.textContent = new Date(Number(maturity) * 1000).toLocaleString();
    totalSupplySpan.textContent = ethers.formatUnits(totalSupply, 18); // Assuming 18 decimals
}

/**
 * Fetches and displays information specific to the connected user.
 */
async function updateUserInfo() {
    const address = await signer.getAddress();
    const balance = await contract.balanceOf(address);

    userAddressSpan.textContent = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    userBalanceSpan.textContent = ethers.formatUnits(balance, 18); // Assuming 18 decimals
}


/**
 * Handles the token buying process (Approve + Buy).
 */
async function handleBuy() {
    const amount = buyAmountInput.value;
    if (!amount || amount <= 0) {
        updateStatus("Please enter a valid amount.");
        return;
    }

    try {
        const amountInWei = ethers.parseUnits(amount, 18); // Assuming pUSD also has 18 decimals

        // 1. Approve the contract to spend pUSD
        updateStatus(`1/2: Approving pUSD spending...`);
        const pUSDContract = new ethers.Contract(pUSDAddress, erc20Abi, signer);
        const approveTx = await pUSDContract.approve(contractAddress, amountInWei);
        await approveTx.wait();
        updateStatus(`1/2: Approval successful!`);

        // 2. Execute the buy function
        updateStatus(`2/2: Executing buy transaction...`);
        const buyTx = await contract.buy(amountInWei);
        await buyTx.wait();
        
        updateStatus(`Successfully bought tokens!`);
        await updateUI(); // Refresh UI to show new balance

    } catch (error) {
        console.error(error);
        updateStatus(error.reason || "Error during the buy process.");
    }
}

/**
 * Handles the redeeming process.
 */
async function handleRedeem() {
    updateStatus("Executing redeem transaction...");
    try {
        const balance = await contract.balanceOf(await signer.getAddress());
        if (balance === 0n) {
            updateStatus("You have no tokens to redeem.");
            return;
        }

        const tx = await contract.redeem();
        await tx.wait();

        updateStatus("Tokens redeemed successfully!");
        await updateUI(); // Refresh UI

    } catch (error) {
        console.error(error);
        updateStatus(error.reason || "Error redeeming tokens.");
    }
}

/**
 * Updates the status message shown to the user.
 * @param {string} message The message to display.
 */
function updateStatus(message) {
    statusElement.textContent = message;
}