import * as React from 'react'
import { useParams } from 'react-router-dom'

export default function OrganizationInfo() {
	const { id } = useParams();
	const [ org, setOrg ] = React.useState(null)

	if (!org) {
		setOrg({
			name: 'example',
			desc: 'Example Organization',
			member: 24,
			id: id
		})
	}
	return (
        <>
			{/* Pages offset setup */}
			<div className="relative min-h-screen w-screen bg-gray-50">
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
								<p className="text-inherit font-light text-md align-bottom hover:underline">Organization</p>
								<p className="text-inherit font-light text-md align-bottom ml-2">/</p>
								<p className="text-blue-500 font-medium text-md align-bottom ml-2 hover:underline">{org.name}</p>
							</div>

							{/* box context */}
							<div className="w-[75vw] min-h-[300px] -ml-4 mt-8 bg-white shadow-md rounded-lg p-6">
								<div className="flex flex-row">
									<CornerLeftDown className="h-6 w-6 mt-3 mr-1 ml-2" />
									<p className="font-semibold text-2xl text-inherit ml-2">{org.name}</p>
								</div>
								<div className="flex flex-col">

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
						</>
						)
}
