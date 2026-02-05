import React from 'react'
// import { familyMembersData } from '../../dummyData/dashboardData'
import FamilyMemberCard from '../ui/FamilyMemberCard'
import { useFamily } from '../../context/FamilyContext'
const FamilyDetails = () => {
    const { familyMembers } = useFamily();
  return (
    <>
        <h2 className="text-xl font-semibold text-foreground my-4">Family Members</h2>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
        {
            familyMembers.map((member) => {
                return <FamilyMemberCard key={member.id} member={member} page="Dashboard" />
            })
        }
        </div>
    </>
  )
}

export default FamilyDetails