
(async () => {
    // console.log(1)
})()

flatten()

function flatten() {

    const items = [
        {
            id: 1,
            sub_items: [
                {
                    id: 2
                },
                {
                    id: 3
                },

            ]
        },
        {
            id: 2,
            sub_items: [
                {
                    id: 4
                },
                {
                    id: 5
                },
            ]
        }
    ]

    const res = items.map((item) =>
        item.sub_items.map((subItem) => subItem.id)
    )
    console.log(res)
}