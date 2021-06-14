//

var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  let pre = null;
  let cur = head;
  while (cur !== null) {
    let temp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = temp;
  }
  return pre;
};

//
var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  const next = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return next;
};
