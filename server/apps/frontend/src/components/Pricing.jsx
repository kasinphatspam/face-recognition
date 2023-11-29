import { User, Camera, Server } from 'react-feather'
import { Button } from '@nextui-org/react'
export default function Pricing({
	session,
	description,
	user,
	snapshot,
	server,
	subscription,
	month,
	custom,
	Popular,
}) {
	return (
		<>
			<div className={`flex flex-col w-[320px] h-[390px] bg-white dark:bg-zinc-600 rounded-lg px-3 dark:drop-shadow-none ${Popular ? "ring-2 ring-pink-600 drop-shadow-[0_0px_20px_rgba(219,39,119,0.25)]" :  "drop-shadow-lg"} ${custom}`}>
				<div className="ml-6 font-semibold mt-8 text-2xl">{session}</div>
				<div className="ml-5 font-light mt-1 text-sm text-black/40 dark:text-white/70">{description}</div>
				<div className='flex flex-row mx-auto mt-8'>
					<User className='w-4 h-4' />
					<div className='font-light text-md text-black/40 dark:text-white/70 -mt-[5px] ml-3'>{user}</div>
				</div>
				<div className='flex flex-row mx-auto mt-2'>
					<Camera className='w-4 h-4' />
					<div className='font-light text-md text-black/40 dark:text-white/70 -mt-[5px] ml-3'>{snapshot ? 'snapshot' : 'all'}</div>
				</div>
				<div className='flex flex-row mx-auto mt-2 mb-8'>
					<Server className='w-4 h-4' />
					<div className='font-light text-md text-black/40 dark:text-white/70 -mt-[5px] ml-3'>{server}</div>
				</div>
				<div className='flex flex-row mt-4 mx-auto'>
					<div className='text-4xl font-extrabold'>{subscription * month}฿</div>
					<div className='font-semibold mt-3 text-lg'>/{month == 1 ? 'month' : 'year'}</div>
				</div>
					<Button className={`mx-auto mt-8 ${Popular ? "bg-[#9F3333] text-white hover:drop-shadow-[0_0px_15px_rgba(219,39,119,0.25)]" :  ""}`}>  Contact us  </Button>
			</div >

		</>
	)
}