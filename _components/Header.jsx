import { Button } from '@/components/ui/button';

function Header() {
  return (
    <div className='p-5 flex justify-between items-center border shadow-md'>

      <img src="/logo.svg" alt="logo" width="200" />

      {/* Correct way to style the Button */}
      <Button className="bg-pink-500 text-white hover:bg-white hover:text-pink-500 border border-pink-500">
        Get Started
      </Button>

    </div>
  );
}

export default Header;
