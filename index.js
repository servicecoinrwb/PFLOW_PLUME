// --- Constants and Configuration ---
// IMPORTANT: Replace with your actual contract addresses
const PUSD_CONTRACT_ADDRESS = "0xdddD73F5Df1F0DC31373357beAC77545dC5A6f3F";
const PROPERTYFLOW_CONTRACT_ADDRESS = "0x14b3Fa2d3627ca1EC8042c9d33Bad94F72CEEe7f";

// The number of decimals your stablecoin uses. VERIFY THIS on a block explorer.
const PUSD_DECIMALS = 6; // It is very likely 6 for a pUSD-like token.

// --- NEW: Full ABI for the PropertyFlow Contract ---
const PROPERTYFLOW_CONTRACT_ABI = [{"inputs":[{"internalType":"address","name":"_pUSDAddress","type":"address"},{"internalType":"uint256","name":"_purchasePrice","type":"uint256"},{"internalType":"uint256","name":"_redeemRate","type":"uint256"},{"internalType":"uint256","name":"_earlyRedeemRate","type":"uint256"},{"internalType":"uint256","name":"_durationSeconds","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"payout","type":"uint256"}],"name":"EarlyRedeemed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"payout","type":"uint256"}],"name":"Redeemed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"earlyRedeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earlyRedeemRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enableTransfers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"fundVault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastBuyTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maturity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pUSD","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"purchasePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"redeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"redeemRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"transfersEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdcBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

// You must provide the pUSD contract's ABI to approve it for spending
const PUSD_CONTRACT_ABI = [
    // A minimal ABI for ERC20 approve function
    {
        "constant": false,
        "inputs": [
            { "name": "_spender", "type": "address" },
            { "name": "_value", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [ { "name": "", "type": "bool" } ],
        "payable": false, "stateMutability": "nonpayable", "type": "function"
    }
];


// --- DOM Element Selection ---
const connectButton = document.getElementById('connectButton');
const buyButton = document.getElementById('buyButton');
const dappSection = document.getElementById('dapp');
const statusEl = document.getElementById('status');
const userAddressEl = document.getElementById('userAddress');
const userBalanceEl = document.getElementById('userBalance');

// --- Application State ---
let provider;
let signer;
let pusdContract;
let propertyFlowContract;

// --- Core Functions ---

async function init() {
    if (typeof window.ethereum === 'undefined') {
        setStatus('Wallet not found. Please install a browser wallet.');
        return;
    }
    provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.listAccounts();
    if (accounts.length > 0) {
        await connectWallet();
    }
    window.ethereum.on('accountsChanged', () => window.location.reload());
}

async function connectWallet() {
    try {
        if (!signer) {
           signer = await provider.getSigner();
        }
        pusdContract = new ethers.Contract(PUSD_CONTRACT_ADDRESS, PUSD_CONTRACT_ABI, signer);
        propertyFlowContract = new ethers.Contract(PROPERTYFLOW_CONTRACT_ADDRESS, PROPERTYFLOW_CONTRACT_ABI, signer);
        
        dappSection.classList.remove('hidden');
        connectButton.textContent = 'Wallet Connected';
        connectButton.disabled = true;
        connectButton.style.cursor = 'default';
        connectButton.style.backgroundColor = '#4a5568';

        await updateUI();
        setStatus('Ready for transactions.');

    } catch (error) {
        console.error("Failed to connect wallet:", error);
        setStatus(`Error connecting: ${error.message}`);
    }
}

// In index.js - REPLACE your existing updateUI function with this one.
async function updateUI() {
    try {
        const address = await signer.getAddress();
        userAddressEl.textContent = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

        const [
            symbol,
            balanceBigInt,
            maturityTimestamp,
            purchasePrice,
            redeemRate,
            earlyRedeemRate,
            totalSupply,
            pflowDecimals
        ] = await Promise.all([
            propertyFlowContract.symbol(),
            propertyFlowContract.balanceOf(address),
            propertyFlowContract.maturity(),
            propertyFlowContract.purchasePrice(),
            propertyFlowContract.redeemRate(),
            propertyFlowContract.earlyRedeemRate(),
            propertyFlowContract.totalSupply(),
            propertyFlowContract.decimals()
        ]);
        
        document.getElementById('contractSymbol').textContent = symbol;
        document.getElementById('contractSymbolDisplay').textContent = symbol;
        
        const maturityDate = new Date(Number(maturityTimestamp) * 1000);
        document.getElementById('maturityDate').textContent = maturityDate.toLocaleString();
        
        // THIS IS THE CRITICAL DISPLAY FIX:
        // This formats the raw numbers into readable dollar amounts like "10.0".
        document.getElementById('purchasePrice').textContent = ethers.formatUnits(purchasePrice, PUSD_DECIMALS);
        document.getElementById('redeemRate').textContent = ethers.formatUnits(redeemRate, PUSD_DECIMALS);
        document.getElementById('earlyRedeemRate').textContent = ethers.formatUnits(earlyRedeemRate, PUSD_DECIMALS);
        
        // Use the token's own decimal value for correct formatting
        userBalanceEl.textContent = ethers.formatUnits(balanceBigInt, pflowDecimals);
        document.getElementById('totalSupply').textContent = ethers.formatUnits(totalSupply, pflowDecimals);
        
    } catch (error) {
        console.error("Failed to update UI:", error);
        setStatus("Could not fetch chain data. Check ABI and contract addresses.");
    }
}

async function buyTokens() {
    const amountToSpend = document.getElementById('buyAmount').value;
    if (!amountToSpend || isNaN(amountToSpend) || +amountToSpend <= 0) {
        setStatus('Please enter a valid amount.');
        return;
    }

    setStatus('Processing transaction...');
    
    try {
        const amountInWei = ethers.parseUnits(amountToSpend, PUSD_DECIMALS);
        setStatus(`Approving ${amountToSpend} pUSD for spending...`);
        const approveTx = await pusdContract.approve(PROPERTYFLOW_CONTRACT_ADDRESS, amountInWei);
        await approveTx.wait();
        
        setStatus('Approval successful! Now proceeding with purchase...');
        
        // CORRECTED: The function name is 'buy' not 'purchase'
        const buyTx = await propertyFlowContract.buy(amountInWei);
        await buyTx.wait();

        setStatus(`Successfully purchased tokens!`);
        await updateUI();

    } catch (error) {
        console.error('Transaction failed:', error);
        setStatus(`Transaction failed: ${error.reason || 'User rejected the transaction.'}`);
    }
}

function setStatus(message) {
    statusEl.textContent = message;
}

// --- Event Listeners ---
connectButton.addEventListener('click', connectWallet);
buyButton.addEventListener('click', buyTokens);

// Run the initialization function when the script loads.
init();
