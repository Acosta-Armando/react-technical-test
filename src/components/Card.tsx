import Text from './text'
import { listUsers } from '../hooks/useFetchData'
import { nationalities } from '../data/nationalities'

interface Props {
  users: listUsers
}

const Card: React.FC<Props> = ({ users }) => {
  const gender = users.gender === 'male' ? 'Masculino' : 'Femenino'
  const nationality = nationalities[users.nat as keyof typeof nationalities]

  return (
    <div className="bg-white rounded-xl grid grid-cols-[128px_1fr] w-full p-2 gap-4 items-center">
      <img src={users.picture.large} alt="photo" className="rounded-xl" />
      <div className="py-1.5">
        <Text variant="h2" className="text-primary text-base leading-8">
          {users.name.first} {users.name.last}
        </Text>
        <Text variant="p">{nationality}</Text>
        <Text variant="p">{gender}</Text>
        <Text variant="p">{users.dob.age} años</Text>
      </div>
    </div>
  )
}

export default Card
