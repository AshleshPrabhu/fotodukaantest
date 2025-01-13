"use client"
import { Search } from '@mui/icons-material';
import { Box, Button, CircularProgress, Input, Modal } from '@mui/material';
import { useRouter } from 'next/navigation'
import React, { useEffect,useState } from 'react'
import { toast } from 'react-toastify';

function OrderCard({
    orders=null,
    cancel=true,
    onDelete=false,
    onEdit=false,
    approve=false,
    isInside=false,
    path='/'
}) {
    console.log("ooo0",orders)
    const [open, setOpen] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedCancel, setSelectedCancel] = useState('')
    const [search, setSearch] = useState('')
    const [reason, setReason] = useState(null)
    const [finalorders, setFinalOrders] = useState(orders)
    const router = useRouter()
    useEffect(()=>{
        setFinalOrders(orders)
    },[orders])
    useEffect(()=>{
        const filteredOrders = orders?.filter(order => order._id.toString().includes(search));
        console.log("fff",filteredOrders)
        setFinalOrders(filteredOrders);
    },[setSearch,search])
    const handleApprove=async(id)=>{
        const response = await fetch(`/api/admin/order/approve`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:id})
        })
        const data = await response.json()
        console.log("approved",data)
        if(!data.success){
            toast.error('failed to approve order', {
                    position: 'top-left',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
            });
        }else {
            toast.success('Order approved', {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
        });
            setTimeout(() => {
                window.location.reload();
            }, 4000); // 3000 milliseconds = 3 seconds
        }
    }
    const handleDelete=async(id)=>{
        const response = await fetch(`/api/admin/order/${id}`)
        const data = await response.json()
        if(!data.success){
            toast.error('failed to delete order', {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
        })
        }else{
            toast.success('order deleted', {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
        })
            window.location.reload()
            if(isInside){
                router.route(`${path}`)
            }
        }
    }
    const handleCancel=async(item)=>{
        if(!reason){
            alert('please enter the reason to cancel the order')
        }else{
            if(selectedCancel=='user'){
                const response = await fetch("/api/order/user",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({id:selectedOrderId,userCancelReason:reason}),
                    cache:"no-store"
                })
                const data = await response.json()
                console.log(data)
                if(!data.success){
                    toast.error('failed to cancel users order')
                }else{
                    toast.success('users order canceled successfully')
                    setOpen(false)
                    setSelectedCancel('')
                    // window.location.reload()
                }
            }else if(selectedCancel=='freelancer'){
                const response = await fetch("/api/order/freelancer/cancel",{
                    method:"POST",
                    headers:{
                    "Content-Type":"application/json"
                    },
                    body:JSON.stringify({id:selectedOrderId,freelancerCancelReason:reason})
                })
                const data = await response.json()
                if(!data.success){
                    toast.error('failed to cancel freelancer order')
                }else{
                    toast.success('freelancer order canceled successfully')
                    setOpen(false)
                    setSelectedCancel('')
                }
            }else{
                alert('enter proper role to cancel the order')
            }
        }
    }
    if (!orders) {
        return (<div className='min-h-[80vh] w-[100vw]'>
            <Box sx={{ display: 'flex' }}>
                <div className='pt-80 flex items-center justify-center text-center mx-auto  '>
            <CircularProgress color="inherit" size="8rem" />
            </div>
            </Box>
        </div>);
      }
    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full flex'>
                <Input
                placeholder='search order by id'
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className='rounded-lg flex-1'
                />
                <Search/>
            </div>
            <div className='h-full w-[90%] grid grid-cols-3 gap-3 mb-5'>
            {finalorders && finalorders.map((item) => (
                <div key={item._id} className='bg-slate-300 p-4 rounded-md shadow-md'>
                <div className='w-full text-xl font-bold text-center'>{item?.service || ""}</div>
                <div className='w-full text-lg text-center'>{item?.event || ""}</div>
                <div className='text-sm'>ORDER ID: {item?._id || ""}</div>
                <div className='text-sm'>Customer name: {item?.customerName || ""}</div>
                <div className='text-sm'>Customer Email: {item?.customerEmail || ""}</div>
                <div className='text-sm'>Customer Phone: {item?.customerPhone || ""}</div>
                <div className='text-sm'>Freelancer Name: {item?.freelancerName || ""}</div>
                <div className='text-sm'>Freelancer Phone: {item?.freelancerPhone || ""}</div>
                <div className='text-sm'>Freelancer Email: {item?.freelancerEmail || ""}</div>
                <div className='text-sm'>Date: {item?.date ? new Date(item.date).toLocaleDateString('en-GB') : ""}</div>
                <div className='text-sm'>Address: {item?.address || ""}</div>
                <div className='text-sm'>City: {item?.city || ""}</div>
                <div className='text-sm'>Pincode: {item?.pinCode || ""}</div>
                <div className='text-sm'>Total Price: {item?.totalAmount || ""}</div>
                <div className='text-sm'>Paid Amount: {item?.paidAmount || ""}</div>
                <div className='text-sm'>Discount Given: {item?.discount || ""}</div>
                {cancel &&
                    <div className='w-full flex items-center justify-center mt-5'>
                        <Button onClick={()=>{setSelectedOrderId(item._id); setOpen(true)}} className={`rounded-xl bg-blue-400 text-white disabled:cursor-not-allowed `} >Cancel</Button>
                        <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                        >
                            <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                bgcolor: 'white',
                                p: 4,
                                borderRadius: 2,
                                width: 400,
                            }}
                            >
                                <div>
                                    <Button onClick={() => setOpen(false)} className="text-black">
                                    Close
                                    </Button>
                                </div>
                                <div className="flex flex-col text-black">
                                    {selectedCancel === '' && (
                                    <>
                                        <div className="text-center text-xl font-bold">
                                        Who Should Cancel the Order?
                                        </div>
                                        <div className="flex items-center justify-center mt-5">
                                        <Button
                                            className="rounded-xl bg-blue-400 text-white"
                                            onClick={() => setSelectedCancel('user')}
                                        >
                                            User Cancel
                                        </Button>
                                        </div>
                                        <div className="flex items-center justify-center mt-5">
                                        <Button
                                            className="rounded-xl bg-blue-400 text-white"
                                            onClick={() => setSelectedCancel('freelancer')}
                                        >
                                            Freelancer Cancel
                                        </Button>
                                        </div>
                                    </>
                                    )}
                                    {(selectedCancel === 'user' || selectedCancel === 'freelancer') && (
                                    <>
                                        <div className="text-center text-xl font-bold">
                                        Are you sure you want to cancel the order?
                                        </div>
                                        <div>Enter the reason for canceling the order:</div>
                                        <input
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        placeholder="Reason for canceling"
                                        className="rounded-lg p-2 border w-full mt-2"
                                        />
                                        <div className="flex items-center justify-center mt-4">
                                        <Button
                                            className="bg-blue-400 text-white rounded-lg"
                                            onClick={() => handleCancel(item)}
                                        >
                                            Cancel the Order
                                        </Button>
                                        </div>
                                        <div className="flex items-center justify-center mt-2">
                                        <Button
                                            className="bg-gray-400 text-white rounded-lg"
                                            onClick={() => setOpen(false)}
                                        >
                                            Close
                                        </Button>
                                        </div>
                                    </>
                                    )}
                                </div>
                            </Box>
                        </Modal>
                    </div>
                }
                
                {approve && 
                    <div className='w-full flex items-center justify-center mt-5'>
                        <Button disabled={(item?.admineApproved||false)} className={`rounded-xl bg-blue-400 text-white ${(item?.admineApproved||false)?"cursor-not-allowed":""} `}  onClick={()=>handleApprove(item?._id)}>Approve the Order</Button>
                    </div>
                }
                {onDelete && 
                    <div className='w-full flex items-center justify-center mt-5'>
                        <Button  className='rounded-xl bg-blue-400 text-white '  onClick={()=>handleDelete(item?._id)}>Delete the Order</Button>
                    </div>
                }
                {onEdit && 
                    <div className='w-full flex items-center justify-center mt-5'>
                        <Button className='rounded-xl bg-blue-400 text-white '  onClick={()=>router.push(`/orders/${item?._id}`)}>Edit the Order</Button>
                    </div>
                }
                
                </div>
                ))}
            </div>
        </div>
)
}

export default OrderCard