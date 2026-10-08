export const PROFILE = {
    GOAL_BASED: "goal-based",
    SELF_EMPLOYED: "self-employed",
} as const

export type Profile = (typeof PROFILE)[keyof typeof PROFILE]

export const profileOptions: { label: string, description: string, key: Profile }[] = [
    {
        label: "Tenho metas de vendas e comissão",
        description: "Acompanhe quanto falta para a meta, quanto precisa vender por dia e quanto vai ganhar ao bater cada faixa.",
        key: PROFILE.GOAL_BASED,
    },
    {
        label: "Trabalho por conta própria",
        description: "Registre seus ganhos e custos e veja quanto sobra de verdade. Para motoristas, entregadores e autônomos.",
        key: PROFILE.SELF_EMPLOYED,
    }
]