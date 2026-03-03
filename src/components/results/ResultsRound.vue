<template>
  <RoundCard
    :round="result"
    :horses
    :testid="`results-round-${result.roundId}`"
  />
</template>

<script setup lang="ts">
import type { RaceRound, Horse } from '@/types'
import RoundCard from '@/components/shared/RoundCard.vue'

type Props = {
  result: RaceRound
  horses: Map<Horse['id'], Horse>
}

defineProps<Props>()
</script>
