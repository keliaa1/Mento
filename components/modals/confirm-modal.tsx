import{
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
}from "@/components/ui/alert-dialog"

interface ConfirmModalProps{
    children: React.ReactNode
    onConfirm: () => void
};
