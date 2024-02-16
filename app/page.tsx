import { Button } from "@/components/ui/button";
import { Camera } from 'lucide-react'


export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Button>default button</Button>
      <Button variant='outline' size='icon'>
        <Camera />
      </Button>
    </div>
  );
}
