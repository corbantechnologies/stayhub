'use client';

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "./Modal";


export const AlertModal = ({
    isOpen,
    onClose,
    loading,
    onConfirm
}) =>{
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() =>{
        setIsMounted(true);
    },[])
    if(!isMounted){
        return null;
    }
    return(
        <Modal 
        title="Are you sure" 
        description="This action cannot be undone"
        isOpen={isOpen}
        onClose={onClose}
        >
            <div className="p-4 space-x-2 flex items-center justify-end w-full ">
                <Button variant='outline' disabled={loading} onClick={onClose}>Cancel</Button>
                <Button variant='destructive' disabled={loading} onClick={onConfirm}>Continue</Button>
            </div>
        </Modal>
    )
}