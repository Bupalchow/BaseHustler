
import { motion } from 'framer-motion'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  optimism,
  baseSepolia,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.li
    whileHover={{ scale: 1.1, color: "#8b5cf6" }}
    whileTap={{ scale: 0.95 }}
  >
    <a href={href} className="text-gray-300  transition-colors">
      {children}
    </a>
  </motion.li>
)

export function NavBar() {
  const queryClient = new QueryClient();
  const config = getDefaultConfig({
    appName: 'BaseHustler',
    projectId: '123456',
    chains: [mainnet, baseSepolia, optimism, base],
    ssr: true, 
  });


  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider theme={darkTheme({
        accentColor: '#7b3fe4',
        overlayBlur:'small'
      })}>
    <div>
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md">
    <nav className="container mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="#" className="text-2xl font-bold">BaseHustler</a>
        </motion.div>
        <div className="flex space-x-8">
        <ConnectButton showBalance={true} />          
        </div>
      </div>
    </nav>
  </header>
  </div>
  </RainbowKitProvider>
  </QueryClientProvider>
</WagmiProvider>
  )
}