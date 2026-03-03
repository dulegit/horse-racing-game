<template>
  <RoundCard
    :round
    :horses
    firstColumnLabel="Lane"
    :testid="`program-round-${round.roundId}`"
  />
</template>

<script setup lang="ts">
import type { RaceRound, Horse } from '@/types'
import RoundCard from '@/components/shared/RoundCard.vue'

type Props = {
  round: RaceRound
  horses: Map<Horse['id'], Horse>
}

defineProps<Props>()
</script>
