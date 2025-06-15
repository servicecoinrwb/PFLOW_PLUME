// --- Constants and Configuration ---
// IMPORTANT: Replace with your actual contract addresses and ABIs
const PUSD_CONTRACT_ADDRESS = "YOUR_PUSD_STABLECOIN_CONTRACT_ADDRESS";
const PROPERTYFLOW_CONTRACT_ADDRESS = "YOUR_PROPERTYFLOW_BOND_CONTRACT_ADDRESS";
const PUSD_CONTRACT_ABI = [/* ... pUSD contract's ABI ... */];
const PROPERTYFLOW_CONTRACT_ABI = [/* ... PropertyFlow contract's ABI ... */];

// The number of decimals your stablecoin uses (e.g., 18 for DAI, 6 for USDC)
const PUSD_DECIMALS = 6;

// --- DOM Element Selection ---
const connectButton = document.getElementById('connectButton');
const buyButton = document.getElementById('buyButton');
const dappSection = document.getElementById('dapp');
const statusEl = document.getElementById('status');
const userAddressEl = document.getElementById('userAddress');
const userBalanceEl = document.getElementById('userBalance');
// ... add all other element selectors here

// --- Application State ---
let provider;
let signer;
let pusdContract;
let propertyFlowContract;

// --- Core Functions ---

/**
 * Connects to the user's wallet (e.g., MetaMask) and initializes the dApp.
 */
async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        setStatus('Wallet not found. Please install MetaMask or another wallet.');
        return;
    }
    
    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();

        pusdContract = new ethers.Contract(PUSD_CONTRACT_ADDRESS, PUSD_CONTRACT_ABI, signer);
        propertyFlowContract = new ethers.Contract(PROPERTYFLOW_CONTRACT_ADDRESS, PROPERTYFLOW_CONTRACT_ABI, signer);
        
        dappSection.classList.remove('hidden');
        connectButton.textContent = 'Wallet Connected';
        connectButton.disabled = true;

        await updateUI();
        setStatus('Ready for transactions.');

    } catch (error) {
        console.error("Failed to connect wallet:", error);
        setStatus(`Error connecting: ${error.message}`);
    }
}

/**
 * Fetches data from the blockchain and updates the user interface.
 */
async function updateUI() {
    try {
        const address = await signer.getAddress();
        userAddressEl.textContent = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

        // Fetch user's PFLOW25 balance and format it for display
        const balanceBigInt = await propertyFlowContract.balanceOf(address);
        // 'formatUnits' is the reverse of 'parseUnits', making BigInts human-readable
        userBalanceEl.textContent = ethers.formatUnits(balanceBigInt, 18); // Assuming PFLOW25 also has 18 decimals

        // You can fetch and display other contract data here
        // Example:
        // document.getElementById('contractSymbol').textContent = await propertyFlowContract.symbol();
    } catch (error) {
        console.error("Failed to update UI:", error);
        setStatus("Could not fetch chain data.");
    }
}


/**
 * Handles the token purchase logic, including approval.
 */
async function buyTokens() {
    const amountToSpend = document.getElementById('buyAmount').value;
    if (!amountToSpend || isNaN(amountToSpend) || +amountToSpend <= 0) {
        setStatus('Please enter a valid amount.');
        return;
    }

    setStatus('Processing transaction...');
    
    try {
        // 1. Convert the human-readable amount to the token's base unit (Wei)
        // This is the CRITICAL FIX for the decimal issue.
        const amountInWei = ethers.parseUnits(amountToSpend, PUSD_DECIMALS);

        // 2. Approve the PropertyFlow contract to spend the user's pUSD
        setStatus(`Approving ${amountToSpend} pUSD for spending...`);
        const approveTx = await pusdContract.approve(PROPERTYFLOW_CONTRACT_ADDRESS, amountInWei);
        
        // Wait for the approval transaction to be mined
        await approveTx.wait();
        setStatus('Approval successful! Now proceeding with purchase...');

        // 3. Call the actual buy function on your contract
        const buyTx = await propertyFlowContract.purchase(amountInWei); // Or whatever your function is named
        await buyTx.wait();

        setStatus(`Successfully purchased tokens!`);
        await updateUI(); // Refresh the user's balance

    } catch (error) {
        console.error('Transaction failed:', error);
        setStatus(`Transaction failed: ${error.reason || error.message}`);
    }
}

/**
 * Helper function to update the status message on the page.
 * @param {string} message - The message to display.
 */
function setStatus(message) {
    statusEl.textContent = message;
}


// --- Event Listeners ---
connectButton.addEventListener('click', connectWallet);
buyButton.addEventListener('click', buyTokens);

// TODO: Add event listeners for your redeem buttons
// redeemButton.addEventListener('click', redeemAtMaturity);
// earlyRedeemButton.addEventListener('click', redeemEarly);
