import React, { useState } from "react";
import { AppLayout } from "../components/layouts/AppLayout";
import { motion } from "framer-motion";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFamily } from "../context/FamilyContext";

const avatarOptions = ["👨", "👩", "👦", "👧", "👴", "👵", "🧑", "👶"];

const FamilyMembers = () => {
	const {
		familyMembers,
		addFamilyMember,
		updateFamilyMember,
		deleteFamilyMember,
		loading,
	} = useFamily();

	// ADD
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [newName, setNewName] = useState("");
	const [selectedAvatar, setSelectedAvatar] = useState("👨");

	// EDIT
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [editMemberId, setEditMemberId] = useState(null);
	const [editName, setEditName] = useState("");
	const [editAvatar, setEditAvatar] = useState("👨");

	const handleAddMember = async () => {
		if (!newName.trim()) return toast.error("Please enter a name");

		await addFamilyMember({ name: newName, avatar: selectedAvatar });

		toast.success(`${newName} added`);
		setNewName("");
		setSelectedAvatar("👨");
		setIsAddOpen(false);
	};

	const openEditDialog = (member) => {
		setEditMemberId(member.id);
		setEditName(member.name);
		setEditAvatar(member.avatar);
		setIsEditOpen(true);
	};

	const handleUpdateMember = async () => {
		if (!editName.trim()) return toast.error("Name cannot be empty");

		await updateFamilyMember(editMemberId, {
			name: editName,
			avatar: editAvatar,
		});

		toast.success("Member updated");
		setIsEditOpen(false);
	};

	const handleDeleteMember = async (member) => {
		if (member.lastExpense !== "No expenses yet") {
			return toast.error("Cannot delete member with expenses");
		}

		if (!confirm(`Delete ${member.name}?`)) return;

		try {
			await deleteFamilyMember(member.id);
			toast.success(`${member.name} deleted`);
		} catch {
			toast.error("Failed to delete member");
		}
	};

	return (
		<AppLayout>
			<div className="max-w-4xl mx-auto">
				{/* HEADER */}
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-2xl font-bold">Family Members</h1>
						<p className="text-muted-foreground">
							Manage your family members
						</p>
					</div>

					{/* ADD MEMBER */}
					<Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
						<DialogTrigger asChild>
							<Button className="btn-gradient-primary">
								<Plus className="w-4 h-4 mr-2" />
								Add Member
							</Button>
						</DialogTrigger>

						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add Family Member</DialogTitle>
							</DialogHeader>

							<Label>Name</Label>
							<Input
								value={newName}
								onChange={(e) => setNewName(e.target.value)}
							/>

							<p className="mt-4">Avatar</p>
							<div className="flex gap-2 flex-wrap">
								{avatarOptions.map((a) => (
									<Button
										key={a}
										onClick={() => setSelectedAvatar(a)}
										className={`text-xl ${a === selectedAvatar ? "bg-primary" : "bg-accent"}`}
									>
										{a}
									</Button>
								))}
							</div>

							<Button onClick={handleAddMember}>Add</Button>
						</DialogContent>
					</Dialog>
				</div>

				{/* MEMBERS */}
				{loading && <p>Loading...</p>}

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{familyMembers.map((member, index) => (
						<motion.div
							key={member.id || member._id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="card-elevated p-6"
						>
							<div className="flex justify-between">
								<div className="flex gap-4">
									<div className="text-3xl">
										{member.avatar}
									</div>
									<div>
										<h3 className="font-semibold text-xl">
											{member.name}
										</h3>
										<p className="text-sm text-muted-foreground">
											Family Member
										</p>
									</div>
								</div>

								<div className="flex gap-2">
									<Button
										size="icon"
										variant="ghost"
										onClick={() => openEditDialog(member)}
									>
										<Edit2 />
									</Button>
									<Button
										size="icon"
										variant="ghost"
										onClick={() =>
											handleDeleteMember(member)
										}
									>
										<Trash2 className="text-destructive" />
									</Button>
								</div>
							</div>

							<div className="mt-4 grid grid-cols-2 border-t pt-4">
								<div>
									<p className="text-xs text-muted-foreground">
										Total Spent
									</p>
									<p className="font-bold">
										${member.totalSpent?.toLocaleString()}
									</p>
								</div>
								<div className="text-right">
									<p className="text-xs text-muted-foreground">
										Trend
									</p>
									<div className="flex justify-end gap-1">
										{member.trend === "up" ? (
											<TrendingUp />
										) : (
											<TrendingDown />
										)}
										{member.trendValue}
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* EDIT DIALOG */}
				<Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Edit Member</DialogTitle>
						</DialogHeader>

						<Label>Name</Label>
						<Input
							value={editName}
							onChange={(e) => setEditName(e.target.value)}
						/>

						<p className="mt-4">Avatar</p>
						<div className="flex gap-2 flex-wrap">
							{avatarOptions.map((a) => (
								<Button
									key={a}
									onClick={() => setEditAvatar(a)}
									className={`text-xl ${a === editAvatar ? "bg-primary" : "bg-accent"}`}
								>
								{a}
								</Button>
							))}
						</div>

						<Button onClick={handleUpdateMember}>Update</Button>
					</DialogContent>
				</Dialog>
			</div>
		</AppLayout>
	);
};

export default FamilyMembers;
