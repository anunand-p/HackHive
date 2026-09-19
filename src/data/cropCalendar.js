// Crop Calendar Data for Kerala and South India

export const CROP_DATA = {
  tomato: {
    name: "Tomato",
    icon: "🍅",
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    plant: [1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    harvest: [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
    info: 'Tomato grows best in Kerala from August–October and January–February. Avoid heavy monsoon planting to prevent bacterial wilt and fruit rot. Requires well-drained loamy soil and minimum 6-8 hours of direct sunlight.'
  },
  banana: {
    name: "Banana",
    icon: "🍌",
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    plant: [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
    harvest: [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
    info: 'Banana can be planted almost year-round in Kerala, but avoiding peak deluge periods is essential. Crops mature in 9–12 months. Requires high potassium fertilization, regular irrigation, and earthing up for wind protection.'
  },
  chilli: {
    name: "Chilli / Pepper",
    icon: "🌶️",
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    plant: [0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
    harvest: [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1],
    info: 'Chilli thrives in warm, relatively dry conditions with moderate humidity. Optimal sowing windows in Kerala are February–March and August–October. Extremely sensitive to waterlogging — raised beds are strongly recommended.'
  },
  ginger: {
    name: "Ginger",
    icon: "🫚",
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    plant: [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    harvest: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    info: 'Ginger is ideally sown in March–May before the onset of monsoon rains. Harvest begins in October–December when leaves turn yellow and pseudostems dry. Requires fertile, well-drained loam and semi-shaded mulch cover.'
  },
  paddy: {
    name: "Paddy / Rice",
    icon: "🌾",
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    plant: [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    harvest: [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    info: 'Paddy is traditionally cultivated in three main seasons in Kerala: Virippu (Autumn, May-June sowing), Mundakan (Winter, Sept-Oct sowing), and Puncha (Summer, Dec-Jan sowing). Water control and pest monitoring are critical.'
  },
  coconut: {
    name: "Coconut",
    icon: "🥥",
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    plant: [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    harvest: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    info: 'Coconut seedlings are best planted with the pre-monsoon showers in May–June. Harvest of mature nuts occurs every 30-45 days year-round. Requires basin irrigation during dry summer months and application of salt and organic manure.'
  }
};
