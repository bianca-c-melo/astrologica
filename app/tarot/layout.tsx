'use client';
import { Navbar } from "@/components/navbar";
import DockApp from "@/tiragem/dock-app";

export default function TarotLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
		 <Navbar /> 
		<section >
			<div>
				{children}
			</div>
		</section>
		</>
	);
}
