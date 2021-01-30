import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { graphqlToModuleLinks } from '../../../utils/utils';
import divToProbs from './div_to_probs';
import contestToPoints from './contest_to_points';
import extraProbs from '../../../../solutions/1_extra_usaco_probs';
import { Problem } from '../../../../content/models';
import { ProblemsList } from './ProblemsList';

// import HTMLComponents from '../HTMLComponents';
import Transition from '../../Transition';
import { useContext } from 'react';
import UserDataContext from '../../../context/UserDataContext/UserDataContext';

const divisions = ['Bronze', 'Silver', 'Gold', 'Platinum'];
const getSeasons = () => {
  const res = [];
  for (let i = 2016; i <= 2021; ++i) {
    res.push(`${i - 1} - ${i}`);
  }
  return res;
};
const seasons = getSeasons();

const color: { [key: string]: string } = {
  Bronze: 'bg-red-800',
  Silver: 'bg-gray-300',
  Gold: 'bg-yellow-300',
  Platinum: 'bg-gray-300', // whoops plat looks basically the same as silver on the website
};

const getCircle = option => {
  return (
    divisions.includes(option) && (
      <span className="inline-block h-5 w-5 p-0.5">
        <span
          className={`inline-block h-4 w-4 rounded-full ${color[option]}`}
        />
      </span>
    )
  );
};

const DivisionButton = ({
  options,
  state,
  onChange,
  dropdownAbove,
}: {
  options: string[];
  state: string;
  onChange: Function;
  dropdownAbove?: boolean;
}) => {
  const [show, setShow] = React.useState(false);
  const handleSelect = option => {
    setShow(false);
    onChange(option);
  };
  const ref = React.useRef();
  React.useEffect(() => {
    const handleClick = e => {
      // @ts-ignore
      if (ref.current.contains(e.target)) return;
      setShow(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className={`inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-800 pr-4 ${
              getCircle(state) ? 'pl-3' : 'pl-4'
            } py-2 bg-white dark:bg-gray-900 text-sm leading-5 font-medium text-gray-700 dark:text-dark-high-emphasis hover:text-gray-500 dark-hover:text-dark-high-emphasis focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150`}
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={() => setShow(!show)}
          >
            {getCircle(state)}

            <span className={`flex-1 ${getCircle(state) ? 'ml-2' : ''}`}>
              {state}
            </span>

            <svg
              className="-mr-1 ml-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>

      <Transition
        show={show}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          className={`${
            dropdownAbove
              ? 'origin-bottom-right bottom-0 mb-12'
              : 'origin-top-right'
          } right-0 absolute z-10 mt-2 rounded-md shadow-lg`} // w-36
        >
          <div className="rounded-md bg-white shadow-xs">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {options.map(option => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="flex items-center w-full text-left px-3 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                >
                  {getCircle(option)}
                  <span className={`flex-1 ${getCircle(option) ? 'ml-2' : ''}`}>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export function DivisionList(props): JSX.Element {
  const data = useStaticQuery(graphql`
    query {
      allMdx(filter: { fileAbsolutePath: { regex: "/content/" } }) {
        edges {
          node {
            frontmatter {
              title
              id
            }
            fields {
              division
            }
            problems {
              uniqueID
              solID
              tags
              difficulty
            }
          }
        }
      }
    }
  `);
  const moduleLinks = React.useMemo(() => graphqlToModuleLinks(data.allMdx), [
    data.allMdx,
  ]);
  const probToLink: { [key: string]: string } = {};
  const probToTags: { [key: string]: string[] } = {};
  const probToDifficulty: { [key: string]: string } = {};
  const probToSol: { [key: string]: string } = {};
  for (const moduleLink of moduleLinks) {
    for (const problem of moduleLink.probs) {
      const uniqueID = problem.uniqueID;
      if (moduleLink.id === 'eulers-formula') {
        console.log('UNIQUE ID', uniqueID, problem.tags);
      }
      probToLink[uniqueID] = moduleLink.url + '/#problem-' + uniqueID;
      probToTags[uniqueID] = problem.tags;
      probToDifficulty[uniqueID] = problem.difficulty;
      probToSol[uniqueID] = problem.solID;
    }
  }
  for (const problem of extraProbs) {
    const uniqueID = problem.uniqueID;
    if (problem.tags && problem.tags.length > 0)
      probToTags[uniqueID] = problem.tags;
    if (problem.difficulty) probToDifficulty[uniqueID] = problem.difficulty;
    if (problem.solID) probToSol[uniqueID] = problem.solID;
  }
  const divisionToSeasonToProbs: {
    [key: string]: { [key: string]: Problem[] };
  } = {};
  const contestToFraction: {
    [key: string]: { [key: string]: number[] };
  } = {};
  for (const division of divisions) {
    divisionToSeasonToProbs[division] = {};
    contestToFraction[division] = {};
  }

  for (const division of divisions) {
    for (const contest of Object.keys(contestToPoints[division])) {
      contestToFraction[division][contest] = [];
      if (contestToPoints[division][contest])
        for (const num of contestToPoints[division][contest])
          contestToFraction[division][contest].push(num);
    }
  }

  for (const division of divisions)
    for (const probInfo of divToProbs[division]) {
      const uniqueID =
        'http://www.usaco.org/index.php?page=viewproblem2&cpid=' + probInfo[0];
      const contest = probInfo[1];
      let fraction = null;
      if (contest in contestToFraction[division]) {
        fraction = contestToFraction[division][contest].shift();
      }
      const prob = new Problem(
        contest, // source
        probInfo[2], // title
        probInfo[0], // id
        probToDifficulty[uniqueID] as
          | 'Very Easy'
          | 'Easy'
          | 'Normal'
          | 'Hard'
          | 'Very Hard'
          | 'Insane'
          | null, // difficulty
        null, // starred
        probToTags[uniqueID], // tags
        probToSol[uniqueID],
        'ok',
        fraction,
        probToLink[uniqueID]
      );
      let year = +probInfo[1].substring(0, 4);
      if (probInfo[1].includes('December')) {
        year++;
      }
      const season = `${year - 1} - ${year}`;
      if (!(season in divisionToSeasonToProbs[division])) {
        divisionToSeasonToProbs[division][season] = [];
      }
      divisionToSeasonToProbs[division][season].push(prob);
    }
  // const [currentDivision, setDivision] = useState(divisions[0]);
  // const [currentSeason, setSeason] = useState(seasons[seasons.length - 1]);
  const userSettings = useContext(UserDataContext);

  let curDivision =
    userSettings.divisionTableQuery && userSettings.divisionTableQuery.division;
  if (!divisions.includes(curDivision)) curDivision = divisions[0];

  let curSeason =
    userSettings.divisionTableQuery && userSettings.divisionTableQuery.season;
  if (!seasons.includes(curSeason)) curSeason = seasons[seasons.length - 1];

  const curShowSols =
    !userSettings.hideSols &&
    !!(
      userSettings.divisionTableQuery &&
      userSettings.divisionTableQuery.showSols
    );
  return (
    <>
      <div className="flex items-center space-x-4">
        <DivisionButton
          options={divisions}
          state={curDivision}
          onChange={newDivision => {
            if (curDivision === newDivision) return;
            userSettings.setDivisionTableQuery({
              division: newDivision,
              season: curSeason,
              showSols: curShowSols,
            });
          }}
        />
        <DivisionButton
          options={seasons}
          state={curSeason}
          onChange={newSeason => {
            if (curSeason === newSeason) return;
            userSettings.setDivisionTableQuery({
              division: curDivision,
              season: newSeason,
              showSols: curShowSols,
            });
          }}
        />
        {!userSettings.hideSols && (
          <DivisionButton
            options={['Show Modules', 'Show Solutions']}
            state={curShowSols ? 'Show Solutions' : 'Show Modules'}
            onChange={showSols => {
              const newShowSols = showSols == 'Show Solutions';
              if (curShowSols === newShowSols) return;
              userSettings.setDivisionTableQuery({
                division: curDivision,
                season: curSeason,
                showSols: newShowSols,
              });
            }}
          />
        )}
      </div>

      <ProblemsList
        problems={divisionToSeasonToProbs[curDivision][curSeason]}
        division={curDivision}
        modules={!curShowSols}
      />
    </>
  );
}
