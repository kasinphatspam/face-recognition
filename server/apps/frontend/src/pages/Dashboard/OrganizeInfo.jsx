import * as React from 'react'
import { useParams } from 'react-router-dom'
import AnalyticsNavigation from '@/components/Navigation'
import Vertical from '@/components/Vertical';
import { CornerLeftDown, User } from 'react-feather';
import { Divider } from "@nextui-org/react";
import Employeecomponent from "@/components/Employeelist";

export default function OrganizationInfo() {
	const { id } = useParams();
	const [org, setOrg] = React.useState({
		name: 'example',
		desc: 'Example Organization',
		member: 24,
		id: id
	})

	return (
		<>
			{/* Pages offset setup */}
			<div className="relative min-h-screen w-screen bg-gray-50 dark:bg-zinc-900">
				<AnalyticsNavigation
					Active="Permission"
				/>
				<div className="flex flex-row relative">
					<Vertical />

					<div className="flex flex-row mt-12 ml-[80px] mb-6">
						<div className="flex flex-col">
							<p className="text-inherit font-bold text-4xl align-bottom">Dashboard</p>

							{/* Head text display forum */}
							<div className="flex flex-row mt-6 ml-1">
								<p className="text-inherit font-light text-md align-bottom hover:underline">Analytics</p>
								<p className="text-inherit font-light text-md align-bottom ml-2">/</p>
								<p className="text-inherit font-light text-md align-bottom ml-2 hover:underline">Organization</p>
								<p className="text-inherit font-light text-md align-bottom ml-2">/</p>
								<p className="text-blue-500 font-medium text-md align-bottom ml-2 hover:underline">{org.name}</p>
							</div>

							{/* box context */}
							<div className="w-[75vw] min-h-[300px] -ml-4 mt-8 bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
								<div className="flex flex-row">
									<CornerLeftDown className="h-6 w-6 mt-3 mr-1 ml-2" />
									<p className="font-bold text-3xl text-inherit ml-2 mt-1">{org.name}</p>
								</div>
								<div className="flex flex-col">
									<div className='flex flex-row mt-4 ml-8'>
										<div className='flex flex-col'>
											<div className='font-semibold text-lg'>Member</div>
											<div className='flex flex-row'>
												<User className='h-4 w-4 mt-1' />
												<div className='font-light ml-2'>{org.member}</div>
											</div>
										</div>
										<Divider orientation="vertical" className='mx-8 h-10 mt-3'  />
										<div className='flex flex-col'>
											<div className='font-semibold text-lg'>Contact</div>
											<div className='flex flex-row'>
												<User className='h-4 w-4 mt-1' />
												<div className='font-light ml-2'>{org.member}</div>
											</div>
										</div>
									</div>
									<div className='mt-16'>
										<Employeecomponent />
									</div>
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
