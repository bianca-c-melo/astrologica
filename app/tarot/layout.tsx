import { Navbar } from "@/components/navbar";

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
