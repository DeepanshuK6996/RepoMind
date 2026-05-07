import { Dialog, DialogHeader } from '@/components/ui/dialog';
import useProject from '@/hooks/use-project';
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import React from 'react'

const Invite = () => {
    const {projectId} = useProject();
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Invite Members to Project</DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}   

export default Invite
