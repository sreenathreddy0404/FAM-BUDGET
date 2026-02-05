import { createContext, useContext, useEffect, useState } from "react";
import {
	getFamilyMembers as getFamilyMembersAPI,
	addFamilyMember as addFamilyMemberAPI,
	updateFamilyMember as updateFamilyMemberAPI,
	deleteFamilyMember as deleteFamilyMemberAPI
} from "@/api/api";
import toast from "react-hot-toast";

const FamilyContext = createContext();

export const FamilyProvider = ({ children }) => {
	const [familyMembers, setFamilyMembers] = useState([]);
	const [loading, setLoading] = useState(false);

	//get all members
	const fetchFamilyMembers = async () => {
		try {
			setLoading(true);
			const res = await getFamilyMembersAPI();

			setFamilyMembers(res.data.data || []);
		} catch (err) {
			toast.error("Failed to fetch family members", err);
			setFamilyMembers([]);
		} finally {
			setLoading(false);
		}
	};

	//add member
	const addFamilyMember = async (memberData) => {
		try {
			setLoading(true);
			await addFamilyMemberAPI(memberData);

			//refetch members after adding new one
			fetchFamilyMembers();
		} catch (err) {
			toast.error("Failed to add member", err);
		} finally {
			setLoading(false);
		}
	};

	//update member
	const updateFamilyMember = async (id, memberData) => {
		try {
			setLoading(true);
			const res = await updateFamilyMemberAPI(id, memberData);

			//refetch members after update
			fetchFamilyMembers();
		} catch (err) {
			toast.error("Failed to update member", err);
		} finally {
			setLoading(false);
		}
	};

	// delete member
	const deleteFamilyMember = async (id) => {
		try {
			setLoading(true);
			await deleteFamilyMemberAPI(id);

			//refetch members after delete
			fetchFamilyMembers();
		} catch (err) {
			toast.error("Failed to delete member", err);
		} finally {
			setLoading(false);
		}
	};

	//get single member details (for edit page)
	const getFamilyMember = async (id) => {
		try {
			const res = familyMembers.find((member) => member.id === id);
			return res;
		} catch (err) {
			toast.error("Failed to fetch member", err);
		}
	};

	useEffect(() => {
		fetchFamilyMembers();
	}, []);

	return (
		<FamilyContext.Provider
			value={{
				familyMembers,
				loading,
				fetchFamilyMembers,
				addFamilyMember,
				updateFamilyMember,
				deleteFamilyMember,
				getFamilyMember,
			}}
		>
			{children}
		</FamilyContext.Provider>
	);
};

export const useFamily = () => useContext(FamilyContext);
