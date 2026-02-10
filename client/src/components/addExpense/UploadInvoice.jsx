import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Receipt, User, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import ExpenseForm from "./ExpenseForm";
import { useFamily } from "@/context/FamilyContext";
import { extractData, addExpense } from "@/api/api";
import { categories } from "@/utils/usefulFunctions";


export function UploadInvoice() {
	const [selectedMemberId, setSelectedMemberId] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
	const [extractedData, setExtractedData] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState("");

	const { familyMembers } = useFamily();

	// Handle file selection
	const handleFileSelect = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		// Validate file type and size
		const validTypes = [
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/webp",
		];
		const maxSize = 10 * 1024 * 1024; // 10MB

		if (!validTypes.includes(file.type)) {
			toast.error("Please upload a PNG or JPG image.");
			return;
		}

		if (file.size > maxSize) {
			toast.error("File size must be less than 10MB.");
			return;
		}

		setSelectedFile(file);
		setPreviewUrl(URL.createObjectURL(file));
	};

	// Handle drag and drop
	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();

		const files = e.dataTransfer.files;
		if (files.length > 0) {
			const file = files[0];
			const validTypes = [
				"image/jpeg",
				"image/jpg",
				"image/png",
				"image/webp",
			];

			if (validTypes.includes(file.type)) {
				setSelectedFile(file);
				setPreviewUrl(URL.createObjectURL(file));
			} else {
				toast.error("Please upload a PNG or JPG image.");
			}
		}
	};

	// Handle upload and extraction
	const handleUpload = async () => {
		if (!selectedFile) {
			toast.error("Please select an invoice image first.");
			return;
		}

		if (!selectedMemberId) {
			toast.error("Please select a family member first.");
			return;
		}

		setIsUploading(true);

		try {
			const formData = new FormData();
			formData.append("receipt", selectedFile);

			// Extract only the values from categories
			const allowedCategories = categories.map((cat) => cat.value);
			formData.append(
				"ALLOWED_CATEGORIES",
				JSON.stringify(allowedCategories),
			);
            
			const response = await extractData(formData);

			// Check if the extraction was successful
			if (response.data && response.data.success) {
				const extracted = response.data.data;
				// Dummy extracted data expected.
				// {
				// 	name: 'Jio Prepaid Mobile Recharge',
				// 	amount: 302,
				// 	date: '25 Oct 2025',
				// 	category: 'Utilities'
				// }
				// Add the selected member ID to the extracted data
				setExtractedData({
					...extracted,
					memberId: selectedMemberId,
				});
				setShowConfirmationDialog(true);
				toast.success("Data extracted successfully!");
			} else {
				throw new Error(response.data?.error || "Extraction failed");
			}
		} catch (error) {
			console.error("Upload error:", error);
			toast.error(
				error.message ||
					"Could not extract data from invoice. Please try again.",
			);
		} finally {
			setIsUploading(false);
		}
	};

	// Handle form submission from dialog
	const handleFormSubmit = async (expenseData) => {
		try {
			// Send data to your API endpoint
			const response = await addExpense(expenseData);

			// Check if the request was successful
			if (response.status === 200 || response.status === 201) {
				toast.success("Expense added successfully.");

				// Reset form and close dialog
				setShowConfirmationDialog(false);
				setSelectedFile(null);
				setPreviewUrl("");
				setSelectedMemberId("");
				setExtractedData(null);

				// If previewUrl exists, revoke it to prevent memory leaks
				if (previewUrl) {
					URL.revokeObjectURL(previewUrl);
				}
			} else {
				throw new Error("Failed to add expense");
			}
		} catch (error) {
			console.error("Error adding expense:", error);
			toast.error("Failed to add expense. Please try again.");
		}
	};

	// Remove selected file
	const handleRemoveFile = () => {
		setSelectedFile(null);
		setPreviewUrl("");
		if (previewUrl) URL.revokeObjectURL(previewUrl);
	};

	return (
		<>
			<div className="text-center py-12">
				<motion.div
					initial={{ scale: 0.9 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.3 }}
					className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-accent flex items-center justify-center"
				>
					<Upload className="w-12 h-12 text-accent-foreground" />
				</motion.div>

				<h3 className="text-xl font-semibold text-foreground mb-2">
					Upload Invoice
				</h3>

				<p className="text-muted-foreground mb-6 max-w-sm mx-auto">
					Take a photo or upload an invoice image. We'll automatically
					extract the expense details using OCR.
				</p>

				{/* Family Member Selection */}
				<div className="max-w-xs mx-auto mb-6">
					<Label
						htmlFor="family-member"
						className="block text-left mb-2"
					>
						Select Family Member
					</Label>
					<Select
						value={selectedMemberId}
						onValueChange={setSelectedMemberId}
					>
						<SelectTrigger id="family-member" className="w-full">
							<SelectValue placeholder="Select a family member" />
						</SelectTrigger>
						<SelectContent>
							{familyMembers.map((member) => (
								<SelectItem key={member.id} value={member.id}>
									<div className="flex items-center gap-2">
										{member.avatar && (
											<span className="text-lg">
												{member.avatar}
											</span>
										)}
										<span>{member.name}</span>
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* File Upload Area */}
				{!selectedFile ? (
					<div
						className="border-2 border-dashed border-border rounded-2xl p-8 hover:border-primary/50 transition-colors cursor-pointer mb-4"
						onDragOver={handleDragOver}
						onDrop={handleDrop}
						onClick={() =>
							document.getElementById("file-upload").click()
						}
					>
						<input
							id="file-upload"
							type="file"
							accept="image/*"
							className="hidden"
							onChange={handleFileSelect}
						/>
						<Receipt className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
						<p className="text-sm text-muted-foreground">
							Click to upload or drag and drop
						</p>
						<p className="text-xs text-muted-foreground mt-1">
							PNG, JPG up to 10MB
						</p>
					</div>
				) : (
					<div className="border-2 border-border rounded-2xl p-6 mb-4">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
									<Receipt className="w-6 h-6 text-primary" />
								</div>
								<div>
									<p className="font-medium text-sm">
										{selectedFile.name}
									</p>
									<p className="text-xs text-muted-foreground">
										{(
											selectedFile.size /
											1024 /
											1024
										).toFixed(2)}{" "}
										MB
									</p>
								</div>
							</div>
							<Button
								variant="ghost"
								size="icon"
								onClick={handleRemoveFile}
								className="h-8 w-8"
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
						{previewUrl && (
							<div className="mt-4">
								<p className="text-sm font-medium mb-2">
									Preview:
								</p>
								<div className="relative w-full h-48 rounded-lg overflow-hidden border">
									<img
										src={previewUrl}
										alt="Invoice preview"
										className="w-full h-full object-contain bg-gray-50"
									/>
								</div>
							</div>
						)}
					</div>
				)}

				{/* Upload Button */}
				<Button
					onClick={handleUpload}
					disabled={!selectedFile || !selectedMemberId || isUploading}
					className="w-full max-w-xs"
				>
					{isUploading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Extracting Data...
						</>
					) : (
						"Upload & Extract Data"
					)}
				</Button>

				<p className="text-xs text-muted-foreground mt-4">
					📝 Invoice images are only used for extraction and are not
					stored
				</p>
			</div>

			{/* Confirmation Dialog */}
			<Dialog
				open={showConfirmationDialog}
				onOpenChange={setShowConfirmationDialog}
			>
				<DialogContent className="sm:max-w-[600px]">
					<DialogHeader>
						<DialogTitle>Confirm Expense Details</DialogTitle>
						<DialogDescription>
							Please review the extracted details and make any
							necessary changes before adding the expense.
						</DialogDescription>
					</DialogHeader>

					{extractedData && (
						<ExpenseForm
							initialData={extractedData}
							familyMembers={familyMembers}
							categories={categories} // Pass the categories array directly
							onSubmit={handleFormSubmit}
							onCancel={() => setShowConfirmationDialog(false)}
							submitButtonText="Add Expense"
						/>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}
