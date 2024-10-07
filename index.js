// Phantom Wallet Integration Function
const connectWallet = async () => {
    try {
        // Check if Phantom wallet is installed
        if (!window.solana || !window.solana.isPhantom) {
            alert('Phantom Wallet not found! Please install Phantom wallet.');
            return;
        }

        // Request connection to Phantom Wallet
        const response = await window.solana.connect();

        // After the user connects to the wallet
        const walletPublicKey = response.publicKey.toString();
        console.log('Connected to wallet:', walletPublicKey);
        alert(`Connected to wallet: ${walletPublicKey}`);
    } catch (error) {
        console.error('Error connecting to wallet:', error);
        alert('Connection failed. Please try again.');
    }
};

// Add event listener for connect-wallet button
document.getElementById('login-btn').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    alert('Opening Phantom Wallet...');
    connectWallet(); // Call the connectWallet function
});
