"use client";

import { UserButton } from "@clerk/nextjs";
import { BarChart3, LayoutGrid, PiggyBank, ReceiptText, Target } from "lucide-react"; // Removed ScrollText
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function SideNav() {
    const menuList = [
        { id: 1, name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
        { id: 2, name: "Budgets", icon: PiggyBank, path: "/dashboard/budgets" },
        { id: 3, name: "Expenses", icon: ReceiptText, path: "/dashboard/expenses" },
        { id: 4, name: "Savings Goals", icon: Target, path: "/dashboard/savings-goals" },
        { id: 5, name: "Reports & Insights", icon: BarChart3, path: "/dashboard/reports" } 
    ];

    const path = usePathname();

    useEffect(() => {
        console.log(path);
    }, [path]);

    return (
        <div className="h-screen p-10 border shadow-md">
            <Image 
                src="/logo.svg" 
                alt="logo" 
                width={160} 
                height={100} 
            />

            <div className="mt-5">
                {menuList.map((menu) => (
                    <Link key={menu.id} href={menu.path} className="block">
                        <h2 className={`flex gap-2 items-center
                                        text-pink-500 font-medium
                                        mb-2
                                        p-5 cursor-pointer rounded-md
                                        hover:text-white hover:bg-pink-500
                                        ${path === menu.path ? 'text-white bg-pink-500' : ''}`}>
                            <menu.icon />
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>

            <div className="fixed bottom-5 p-5 flex gap-2 items-center text-pink-500">
                <UserButton />
                <span>Profile</span>
            </div>
        </div>
    );
}

export default SideNav;
