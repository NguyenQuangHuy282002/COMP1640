export const handleFilter = (sortType: any, key?: any) => {
  let temp = sortType;

  // if (page === 'users' && temp === 'Name') {
  //   temp = 'Username';
  // } else if (page === 'users' && temp === 'Popular') {
  //   temp = 'Popular users';
  // }

  let todayDate = Date.now()

  function getTime(a) {
    return new Date(a).getTime()
  }

  const milliSecDay = 86300000
  const milliSecWeek = 604800000
  const milliSecMonth = 2628000000
  const milliSecYear = 31540000000

  switch (temp) {
    // case 'Newest':
    //   return (a, b) => new Date(b.created_at) - new Date(a.created_at);
    case 'new':
      return 'tab=new';
    // case 'New Users':
    //   return (a, b) => new Date(b.created_at) - new Date(a.created_at);
    case 'hot':
      return 'tab=hot';
    case 'best':
      return 'tab=best';
    case 'oldest':
      return 'sort=oldest';
    // case 'popular':
    //   return (a, b) => b.posts_count - a.posts_count;
    // case 'Name':
    //   return (a, b) => a.tagname.localeCompare(b.tagname);
    // case 'Username':
    //   return (a, b) => a.username.localeCompare(b.username);
    // case 'Popular users':
    //   return (a, b) => b.views - a.views;
    case 'keyword':
        return `keyword=${key.replace(' ', '-')}`;
    // case 'Week':
    //   return (a, b): string => {
    //     const aDate = todayDate - getTime(a.created_at)
    //     const bDate = todayDate - getTime(b.created_at)
    //     if (aDate < milliSecWeek && bDate < milliSecWeek) {
    //       return `time=${b.answer_count + b.comment_count - (a.answer_count + a.comment_count)}`;
    //     }
    //   }
    // case 'Month':
    //   return (a, b): string => {
    //     const aDate = todayDate - getTime(a.created_at)
    //     const bDate = todayDate - getTime(b.created_at)
    //     if (aDate < milliSecMonth && bDate < milliSecMonth) {
    //       return `time=${b.answer_count + b.comment_count - (a.answer_count + a.comment_count)}`;
    //     }
    //   }
    default:
      break;
  }
}