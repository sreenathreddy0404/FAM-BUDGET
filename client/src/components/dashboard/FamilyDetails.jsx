import React from 'react'
import { familyMembersData } from '../../dummyData/dashboardData'
import FamilyMemberCard from '../ui/FamilyMemberCard'

const FamilyDetails = () => {
  return (
    <>
        <h2 className="text-xl font-semibold text-foreground my-4">Family Members</h2>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4'>
        {
            familyMembersData.map((member) => {
                return <FamilyMemberCard key={member.id} member={member} page="Dashboard" />
            })
        }
        </div>
    </>
  )
}

export default FamilyDetails