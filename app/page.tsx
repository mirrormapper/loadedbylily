import { CartProvider } from "@/components/cart-provider"
import { HomeExperience } from "@/components/home-experience"

export default function Home() {
  return (
    <CartProvider>
      <HomeExperience />
    </CartProvider>
  )
}
