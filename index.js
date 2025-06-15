// This is the ABI for your main bonding contract
const contractABI = [{"inputs":[{"internalType":"address","name":"_pUSDAddress","type":"address"},{"internalType":"uint256","name":"_purchasePrice","type":"uint256"},{"internalType":"uint256","name":"_redeemRate","type":"uint256"},{"internalType":"uint256","name":"_earlyRedeemRate","type":"uint256"},{"internalType":"uint256","name":"_durationSeconds","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"payout","type":"uint256"}],"name":"EarlyRedeemed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"payout","type":"uint256"}],"name":"Redeemed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"earlyRedeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earlyRedeemRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enableTransfers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"fundVault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastBuyTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maturity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pUSD","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"purchasePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"redeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"redeemRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"transfersEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdcBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
const contractAddress = "0x14b3Fa2d3627ca1EC8042c9d33Bad94F72CEEe7f";

// This is a standard ABI for an ERC20 token's 'approve' function.
const erc20Abi = [
    "function approve(address spender, uint256 amount) external returns (bool)"
];
// Global variables to hold contract state
let pUSDAddress;
let purchasePrice; // We will store the fetched purchase price here

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
const purchasePriceSpan = document.getElementById('purchasePrice');
const earlyRedeemRateSpan = document.getElementById('earlyRedeemRate');
const redeemRateSpan = document.getElementById('redeemRate');

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

        connectButton.classList.add('hidden');
        dappInterface.classList.remove('hidden');
        
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
    const [name, symbol, maturity, totalSupply, pUSDAddr, fetchedPurchasePrice, earlyRedeemRate, redeemRate] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.maturity(),
        contract.totalSupply(),
        contract.pUSD(),
        contract.purchasePrice(),
        contract.earlyRedeemRate(),
        contract.redeemRate()
    ]);

    pUSDAddress = pUSDAddr;
    purchasePrice = fetchedPurchasePrice; // Store the price globally for calculations

    contractNameSpan.textContent = name;
    contractSymbolSpan.textContent = symbol;
    contractSymbolDisplay.textContent = symbol;
    maturityDateSpan.textContent = new Date(Number(maturity) * 1000).toLocaleString();
    totalSupplySpan.textContent = ethers.formatUnits(totalSupply, 18);

    // CORRECTED: Format prices using 18 decimals
    purchasePriceSpan.textContent = ethers.formatUnits(purchasePrice, 18);
    earlyRedeemRateSpan.textContent = ethers.formatUnits(earlyRedeemRate, 18);
    redeemRateSpan.textContent = ethers.formatUnits(redeemRate, 18);
}

/**
 * Fetches and displays information specific to the connected user.
 */
async function updateUserInfo() {
    const address = await signer.getAddress();
    const balance = await contract.balanceOf(address);

    userAddressSpan.textContent = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    userBalanceSpan.textContent = ethers.formatUnits(balance, 18);
}


/**
 * Handles the token buying process (Approve + Buy).
 */
async function handleBuy() {
    const pUSDAmountToSpendStr = buyAmountInput.value;
    if (!pUSDAmountToSpendStr || pUSDAmountToSpendStr <= 0) {
        updateStatus("Please enter a valid amount.");
        return;
    }

    try {
        // This is the amount of pUSD the user wants to spend
        const pUSDAmountToSpend = ethers.parseUnits(pUSDAmountToSpendStr, 18);
        
        // CORRECTED LOGIC: Calculate how many PFLOW25 tokens the user will get for their pUSD
        // This reverses the math in the smart contract: (pUSD * 1e18) / price
        const pflow25ToReceive = (pUSDAmountToSpend * BigInt(1e18)) / purchasePrice;

        // 1. Approve the contract to spend pUSD
        updateStatus(`1/2: Approving ${pUSDAmountToSpendStr} pUSD spending...`);
        const pUSDContract = new ethers.Contract(pUSDAddress, erc20Abi, signer);
        // We approve the exact cost, which is the amount of pUSD to spend
        const approveTx = await pUSDContract.approve(contractAddress, pUSDAmountToSpend);
        await approveTx.wait();
        updateStatus(`1/2: Approval successful!`);

        // 2. Execute the buy function with the calculated amount of PFLOW25 tokens
        updateStatus(`2/2: Buying ${ethers.formatUnits(pflow25ToReceive, 18)} PFLOW25...`);
        const buyTx = await contract.buy(pflow25ToReceive);
        await buyTx.wait();
        
        updateStatus(`Successfully bought tokens!`);
        await updateUI();

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
        await updateUI();

    } catch (error) {
        console.error(error);
        updateStatus(error.reason || "Error redeeming tokens.");
    }
}

/**
 * Updates the status message shown to the user.
 */
function updateStatus(message) {
    statusElement.textContent = message;
}