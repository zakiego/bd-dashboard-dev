import { dbClient } from '@/db'

interface Params {
  screenName: string
}

export async function GET(request: Request, context: { params: Params }) {
  const profile = await dbClient.query.tweets.findFirst({
    where: (fields, operators) => operators.and(operators.eq(fields.tweetUserScreenName, context.params.screenName)),
    columns: {
      tweetUserId: true,
      tweetProfileImageUrl: true,
      tweetUserName: true,
      tweetUserScreenName: true,
    },
  })

  const tweets = await dbClient.query.tweets.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.isPublic, true),
        operators.eq(fields.tweetUserScreenName, context.params.screenName)
      )
    },

    columns: {
      id: true,
      tweetUserId: true,
      tweetProfileImageUrl: true,
      tweetData: true,
      tweetCreatedAt: true,
      tweetId: true,
      tweetText: true,
      tweetUserName: true,
      tweetUserScreenName: true,
    },
    with: {
      topic: {
        columns: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  })

  // get unique topics from tweets
  const topics = tweets.reduce((acc: Record<string, (typeof tweets)[number]['topic']>, tweet) => {
    const topic = tweet.topic
    if (!topic) return acc

    acc[topic.id] = topic
    return acc
  }, {})

  return Response.json({ data: { profile, tweets, topics: Object.values(topics) } })
}
