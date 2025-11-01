import { useContext, useEffect, type ReactNode } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import RenameChatForm from "./components/RenameChatForm";
import { Context } from "./context/Context";
import type { IContext } from "./interfaces/Context.interface";
import Search from "./pages/Search";

export default function App(): ReactNode {
	const location = useLocation();
	const { navigate } = useContext(Context) as IContext;

	useEffect(() => {
		if (location.pathname !== "/") {
			navigate("/");
		}
	}, []);

	return (
		<>
			<Header />
			<Sidebar />
			<Routes>
				<Route index element={<Home />} />
				<Route path="/app/:id" element={<Chat />} />
				<Route path="/app/search" element={<Search />} />
			</Routes>
			<RenameChatForm />
		</>
	);
}
