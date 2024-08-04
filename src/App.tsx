import { useState } from 'react'
import Card from './components/Card'
import Dropdown from './components/Dropdown'
import NavButton from './components/NavButton'
import Input from './components/Input'
import Text from './components/text'
import { useFetchData } from './hooks/useFetchData'
import { listUsers } from './hooks/useFetchData'
import { nationalities } from './data/nationalities'
import Skeleton from './components/Skeleton'

const App = () => {
  const { data, loading, error } = useFetchData(
    'https://randomuser.me/api/?inc=picture,name,nat,gender,dob&results=1000'
  )
  const dataResults = data?.results as listUsers[] | undefined
  const nationalityData = dataResults
    ? (["Seleccione"].concat([...new Set(dataResults.map((item) => item.nat))].sort()) as string[])
    : ["Seleccione"];
  
  const [results, setResults] = useState<string>('20')
  const [gender, setGender] = useState<string>('Seleccione')
  const [nat, setNat] = useState<string>('Seleccione')
  const [age, setAge] = useState<string>('')
  const [page, setPage] = useState<number>(1)

  if (error) {
    return (
      <Text variant="h2" className="px-4 md:px-20 xl:px-28">
        {error}
      </Text>
    )
  }

  const filteredResults = dataResults
    ? dataResults
        .filter((user) => {
          const userGender = user.gender === 'male' ? 'Masculino' : 'Femenino'
          const userAge = user.dob.age.toString()
          const userNat = nationalities[user.nat as keyof typeof nationalities]

          return (
            (gender === 'Femenino' || gender === 'Masculino' ? userGender === gender : true) &&
            (nat !== 'Seleccione' ? userNat === nat : true) &&
            (age !== '' ? userAge.includes(age) : true)
          )
        })
    : []

  const resultsPerPage = parseInt(results)
  const startIndex = (page - 1) * resultsPerPage
  const endIndex = startIndex + resultsPerPage
  const pageResults = filteredResults.slice(startIndex, endIndex)

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const nextPage = () => {
    if (endIndex < filteredResults.length) {
      setPage(page + 1)
    }
  }

  return (
    <>
      <main className="px-4 lg:px-20 xl:px-36 pb-3.5 max-w-[1920px]">
        <div className="flex flex-col flex-wrap md:flex-row gap-2 md:gap-6 py-3 md:py-5">
          <Dropdown
            type={'results'}
            title={'Resultados por página'}
            options={['20', '50', '100']}
            onSelect={(value: string) => setResults(value)}
          />
          <Dropdown
            type={'gender'}
            title={'Género'}
            options={['Seleccione', 'Femenino', 'Masculino']}
            onSelect={(value: string) => setGender(value)}
          />
          <Dropdown
            type={'nat'}
            title={'Nacionalidad'}
            options={nationalityData}
            onSelect={(value: string) => setNat(value)}
          />
          <Input 
            title={'Edad'}
            onSelect={(value: string) => setAge(value)}
          />
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
            {Array.from({ length: parseInt(results) }, (_, index) => (
              <Skeleton key={index} />
            ))}
        </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
            {pageResults.map((value, index) => (
              <Card key={index} users={value} />
            ))}
          </div>
        )}
        {!loading && (
          <div className="flex items-center justify-around md:justify-center py-10 md:py-16 md:gap-28">
            <NavButton
              title={'Anterior'}
              onCLick={prevPage}
              disabled={page === 1}
            />
            <NavButton
              title={'Siguiente'}
              onCLick={nextPage}
              disabled={endIndex >= filteredResults.length}
            />
          </div>
        )}
      </main>
    </>
  )
}

export default App
