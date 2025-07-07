import Link from 'next/link';

export default function Navigation(){

    // renders on the dashboard 
    // username on the top 
    // notes section 
    // can place the logout component at the bottom 
    // toggle nav bar to adjust the screen size 
    
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
          <Link
            className="mb-2 flex h-20 items-end justify-start rounded-md bg-neutral-600 p-4 md:h-40"
            href="/"
          >
            <div className="w-32 text-white md:w-40">
              navbar
            </div>
          </Link>
          
        </div>
      );
}