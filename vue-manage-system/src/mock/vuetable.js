export const vuetable = [
    {
        path: '/api/table',
        data: {
            'data|10':[{
                'nickname':'@cname',
                'gender':'@integer(0, 2)',
                'origin':'@county(true)',
                'destination':'@county(true)',
                'early':'@date("yyyy-MM-dd")',
                'late':'@date("yyyy-MM-dd")',
                'days':'@natural(1, 30)',
                'number':'@natural(1, 100)',
                'phone':/^1[34578]\d{9}$/,
                'comment':'@csentence'
            }]
        }
    }
]