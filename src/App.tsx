import {
  Container,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useState } from "react"
import useInfiniteScroll from "react-infinite-scroll-hook"

const LIMIT = 25

interface Ranking {
  rank: number
  offset: number
  name: string
  livers: number
  time: number
}

export default function App() {
  const [data, setData] = useState<{
    items: Ranking[]
    loading: boolean
    offset: number
    hasNextPage: boolean
    error: unknown
  }>({
    items: [],
    loading: false,
    offset: 0,
    hasNextPage: true,
    error: undefined,
  })
  const { items, loading, offset, error, hasNextPage } = data

  const onLoadMore = loading
    ? () => void {}
    : () => {
        setData({ ...data, loading: true })

        fetch(`https://liver.auros.dev?limit=${LIMIT}&offset=${offset}`)
          .then((res) => res.json())
          .then((res: Ranking[]) => {
            setData({
              ...data,
              items: [...items, ...res],
              loading: false,
              offset: offset + LIMIT,
              hasNextPage: res.length === LIMIT,
            })
          })
          .catch((err) => setData({ ...data, error: err, loading: false }))
      }

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore,
    disabled: !!error,
  })

  return (
    <Container maxW="container.md" padding={4} centerContent>
      <Heading marginBottom={4}>Liverboard</Heading>
      <Table>
        <Thead>
          <Tr>
            <Th textAlign="center">Rank</Th>
            <Th>Name</Th>
            <Th textAlign="center">Livers</Th>
            <Th textAlign="right">Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => {
            const { rank, offset, name, livers, time } = item

            const ms = `${time % 1000}`.padStart(3, "0")
            const s = `${Math.floor(time / 1000) % 60}`.padStart(2, "0")
            const m = Math.floor(time / 1000 / 60)

            return (
              <Tr key={offset}>
                <Td textAlign="center">{rank}</Td>
                <Td>{name.trim() ? name : (<i>Invalid Name</i>)}</Td>
                <Td textAlign="center" fontWeight="semibold">
                  {livers}
                </Td>
                <Td textAlign="right">
                  {m}:{s}.{ms}
                </Td>
              </Tr>
            )
          })}
          {(loading || hasNextPage) && (
            <Tr ref={sentryRef}>
              <Td colSpan={4} textAlign="center">
                <Spinner />
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Container>
  )
}
