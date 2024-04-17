import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { Button } from "@components/ui/button";

interface BuyTicketButtonProps {
  movieId: number;
  price: number;
}

const BuyTicketButton = ({ movieId, price }: BuyTicketButtonProps) => {
  return (
    <Link href={`/payment?movieId=${movieId}`}>
      <Button className="gap-3 bg-blue-500 hover:bg-blue-600" asChild>
        <div>
          <ShoppingCart className="h-4 w-4" />
          <p>Купить билет</p>
          <p>{price} руб.</p>
        </div>
      </Button>
    </Link>
  );
};

export default BuyTicketButton;
