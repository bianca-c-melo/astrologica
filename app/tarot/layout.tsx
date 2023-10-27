'use client';
import { Navbar } from "@/components/navbar";
import DockApp from "@/app/tiragem/dock-app";

export default function TarotLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
		 <Navbar /> 
		<section >
			
			<div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-300 via-stone-300 to-lime-100">
				{children}
			</div>
		</section>
		</>
	);
}
