export const AURA_KEY_ABI = [
	// Events
	"event AuraKeyBought(address indexed buyer, uint256 amount)",

	// Functions
	"function admin() external view returns (address)",
	"function buyAuraKey(uint256 amount) external",
	"function paymentToken() external view returns (address)",
	"function pricePerKey() external view returns (uint256)",
	"function setPricePerKey(uint256 newPrice) external",
];