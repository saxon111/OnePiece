function timeout(n: number) {
  return new Promise((res) => setTimeout(res, n));
}

export async function addNumbers(a: number, b: number) {
  await timeout(500);
  return a + b;
}

(async () => {
  console.log(await addNumbers(3, 4));
})();

function contact(email: string, phone: number): string[];
function contact(email: string, address: string): number[];

function contact(email, phone) {
  return [email];
}

contact("1", "1");

interface app {
  (email: number, phone: string): void;
}

type App = (email: number, phone: string) => void;

const appfn: App = (a, b) => {
  return 1;
};

interface numberProp {
  [prop: string]:
    | undefined
    | {
        bob: string;
        addy: number;
      };
}

const a: numberProp = {};
if (a.avv) {
  a.avv;
}

interface PhoneNumberDict {
  //   // arr[0],  foo['myProp']
  [numberName: string]:
    | undefined
    | {
        areaCode: number;
        num: number;
      };

  home: {
    /**
     * (7) interfaces are "open", meaning any declarations of the
     * -   same name are merged
     */
    areaCode: number;
    num: number;
  };
}

interface PhoneNumberDict {
  office: {
    areaCode: number;
    num: number;
  };
}

const phoneDict: PhoneNumberDict = {
  office: { areaCode: 321, num: 5551212 },
  home: { areaCode: 321, num: 5550010 }, // try editing me
};
