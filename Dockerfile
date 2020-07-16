#
# File name: Dockerfile_pattern
# Description: Dockerfile which builds the Webash api's image
# Authors: cestoliv
# If you're a new WeBash contributor and worked on this file, please add your name here.
#
# This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
# You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
#

FROM node:latest
LABEL maintainer="cestoliv@chevro.fr"

WORKDIR /app
COPY package.json /app
RUN npm install

COPY server.js /app
COPY .env /app
COPY res /app/res
COPY README.md /app
COPY LICENSE /app

EXPOSE 8085
CMD [ "npm", "start" ]
