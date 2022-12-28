<template>
  <div>

    <v-card-title
      class="justify-center"
    >
      <div style="background:linear-gradient(transparent 70%, #FFFF00 100%);">
        『Edible』ができること
      </div>
    </v-card-title>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        class="mb-10"
      >
        <v-list flat>
          <v-list-item
            v-for="(point, i) in points"
            :key="`point-${i}`"
          >
            <v-list-item-icon>
              <v-icon
                size="30"
                :color="point.color"
              >
                {{ point.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <div
                class="text-subtitle-1"
                v-text="point.text"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-container
          fluid
          fill-height
        >
          <v-row
            justify="space-around"
            align-items="center"
          >
            <div
              v-for="(func, i) in functions"
              :key="`func-${i}`"
              class="text-center pa-2"
            >
              <v-avatar
                :color="func.color"
                size="160"
              >
                <span class="white--text font-weight-bold">
                  {{ func.name }}
                </span>
              </v-avatar>
              <div class="pt-2 text-body-2 my-grey font-weight-bold">
                {{ func.use }}
              </div>
            </div>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-card-title class="justify-center">
      <div style="background:linear-gradient(transparent 70%, #FFFF00 100%);">
        『Edible』が解決できる悩み
      </div>
    </v-card-title>
    <v-row>
      <v-col
        cols="12"
        class="py-0"
      >
        <v-card-actions
          class="py-0"
        >
          <v-spacer />
          <v-radio-group
            v-model="user"
            row
          >
            <v-radio
              v-for="(user, i) in users"
              :key="`user-${i}`"
              :label="$t(`menus.users.${user.label}`)"
              :value="user.label"
              :color="user.color"
            />
          </v-radio-group>
        </v-card-actions>
      </v-col>
      <v-col
        v-for="(que, i) in questions"
        :key="`que-${i}`"
        cols="12"
        :sm="12 / questions.length"
      >
        <v-card
          max-width="400"
          class="mx-auto mb-10"
        >
          <v-card-title
            :class="['white--text', que.color]"
          >
            {{ que.name }}
          </v-card-title>

          <v-card-actions
            class="justify-center align-baseline font-weight-bold"
          >
            {{ que.text[user] }}
          </v-card-actions>

          <v-divider/>

          <v-card-actions
            class="justify-center align-baseline font-weight-bold blue--text text--darken-3"
        >
            {{ que.answer[user] }}
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  data () {
    const users = [
      { label: 'farmer', color: 'indigo' },
      { label: 'consumer', color: 'appblue' }
    ]
    return {
      users,
      user: users[0].label,
      points: [
        {
          icon: 'mdi-cart',
          color: '#CC0000',
          text: '農家は農産物を出品できる'
        },
        {
          icon: 'mdi-cart',
          color: '#CC0000',
          text: '消費者は農産物を購入できる'
        },
        {
          icon: 'mdi-file-document',
          color: '#336791',
          text: '農家は農産物に関する情報を発信できる'
        },
        {
          icon: 'mdi-file-document',
          color: '#336791',
          text: '消費者は農産物に関する情報を閲覧できる'
        },
        {
          icon: 'mdi-charity',
          color: '#00C48D',
          text: 'コミュニティを形成できる'
        },
        {
          icon: 'mdi-charity',
          color: '#00C48D',
          text: '農家、消費者、地元間の交流ができる'
        }
      ],
      functions: [
        { name: 'Transaction', use: 'Point1', color: '#CC0000' },
        { name: 'Information', use: 'Point2', color: '#336791' },
        { name: 'Community', use: 'Point3', color: '#00C48D' }
      ],
      questions: [
        {
          name: 'Question1',
          color: 'primary',
          text: {
            farmer: '味は良くても形が良くないという理由だけで、廃棄になってしまう農産物が多いのですが、それらの農産物は出品できますか？',
            consumer: '普段買い物するときに野菜や果物は高い為、なかなか買えないのですが、こちらには比較的安く売っている農産物はありますでしょうか。'
          },
          answer: {
            farmer: '出品できます。出品時に条件を満たしているかどうかのチェック項目があるのですが、過度な傷等なければ出品することは可能です。',
            consumer: 'ございます。こちらのサービスは多少の傷ものの野菜や果物なら出品できるため、そちらは比較的安く購入できます。'
          }
        },
        {
          name: 'Question2',
          color: 'primary',
          text: {
            farmer: '私自身が普段栽培している農産物を始めとして、農家としてPR活動も行いたいのですが、それはできますでしょうか？',
            consumer: 'そのときに旬の野菜や果物等、農産物に関する情報を色々と知りたいのですが、そのような情報を知ることはできますでしょうか？'
          },
          answer: {
            farmer: '農家としてPR活動できます。『農家の呟き』という機能があるのですが、そちらを使ってPR活動も行なっていただけます。',
            consumer: 'できます。『農家の呟き』という機能があるのですが、そちらを使って農家の方々が発信する情報を閲覧していただけます。'
          }
        },
        {
          name: 'Question3',
          color: 'primary',
          text: {
            farmer: '他の農家や消費者の方々とも農産物やその他のことについて、色々と交流したいのですが、それはできますでしょうか？',
            consumer: '他の消費者や農家の方々とも農産物やその他のことについて、色々と交流したいのですが、それはできますでしょうか？'
          },
          answer: {
            farmer: '交流できます。『コミュニティ』という機能があるのですが、そちらを使って他の農家や消費者の方々とも交流していただけます。',
            consumer: '交流できます。『コミュニティ』という機能があるのですが、そちらを使って他の消費者や農家の方々とも交流していただけます。'
          }
        }
      ]
    }
  }
}
</script>